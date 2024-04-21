import Crunker from "crunker";

export const mergeIntoBlob = async (blobs: Blob[]): Promise<Blob> => {
  const crunker = new Crunker();
  const audioBuffers = await crunker.fetchAudio(...blobs);
  const mergedAudio = await crunker.mergeAudio(audioBuffers);
  const { blob } = crunker.export(mergedAudio, "audio/wav");
  return blob;
};

export const mergeAndDownload = async (blobs: Blob[]): Promise<void> => {
  const crunker = new Crunker();
  const audioBuffers = await crunker.fetchAudio(...blobs);
  const mergedAudio = await crunker.mergeAudio(audioBuffers);
  const { blob } = await crunker.export(mergedAudio);
  await crunker.download(blob, "audio/mp3");
};

export const exportBufferToBlob = async (
  buffer: AudioBuffer,
): Promise<Blob> => {
  const crunker = new Crunker();
  const { blob } = crunker.export(buffer, "audio/wav");
  return blob;
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const crunker = new Crunker();
  return crunker.download(blob, filename);
};
