import {
  AutoTokenizer,
  MusicgenForConditionalGeneration,
  BaseStreamer,
  env,
} from "./js/transformers.js";

// Library for turning audio data array into a WAV file
function minFramesForTargetMS(targetDuration, frameSamples, sr = 16e3) {
  return Math.ceil((targetDuration * sr) / 1e3 / frameSamples);
}
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function encodeWAV(
  samples,
  format = 3,
  sampleRate = 16e3,
  numChannels = 1,
  bitDepth = 32,
) {
  var bytesPerSample = bitDepth / 8;
  var blockAlign = numChannels * bytesPerSample;
  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  var view = new DataView(buffer);
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);
  if (format === 1) {
    floatTo16BitPCM(view, 44, samples);
  } else {
    writeFloat32(view, 44, samples);
  }
  return buffer;
}

function writeFloat32(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 4) {
    output.setFloat32(offset, input[i], true);
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; ++i) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Main function that starts the (download and) music generation process
export async function generateMusic(onProgress, prompt, temperature, duration) {
  // Load tokenizer and model
  const tokenizer = await AutoTokenizer.from_pretrained(
    "Xenova/musicgen-small",
  );

  const model = await MusicgenForConditionalGeneration.from_pretrained(
    "Xenova/musicgen-small",
    {
      progress_callback: onProgress,
      dtype: {
        text_encoder: "q8",
        decoder_model_merged: "q8",
        encodec_decode: "fp32",
      },
      device: "wasm",
    },
  );

  // Prepare text input
  const inputs = tokenizer(prompt);

  const max_length = Math.min(
    Math.max(Math.floor(duration * 50), 1) + 4,
    model.generation_config.max_length ?? 1500,
  );

  let guidance_scale = null;

  class CallbackStreamer extends BaseStreamer {
    constructor(callback_fn) {
      super();
      this.callback_fn = callback_fn;
    }

    put(value) {
      return this.callback_fn(value);
    }

    end() {
      return this.callback_fn();
    }
  }

  const streamer = new CallbackStreamer(() => {});

  // Generate audio
  const audio_values = await model.generate({
    // Inputs
    ...inputs,

    // Generation parameters
    max_length, // duration, as number of tokens. 10 seconds equals to approximatately 1500 tokens
    guidance_scale,
    temperature,

    // Outputs
    streamer,
  });

  // turn array into a WAV file
  let wav = encodeWAV(audio_values.ort_tensor.cpuData, 3, 32000, 1, 32); // The MusicGen model outputs at a samplerate of 32000, 1 channel (mono), 32 bit data,
  let wav_blob = new Blob([wav], { type: "audio/wav" });
  return wav_blob;
}
