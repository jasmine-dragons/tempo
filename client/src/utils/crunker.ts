import Crunker from "crunker";

export const mergeIntoBlob = async (blobs: Blob[]): Promise<Blob> => {
  const crunker = new Crunker();
  const audioBuffers = await crunker.fetchAudio(...blobs);
  const mergedAudio = await crunker.mergeAudio(audioBuffers);
  const { blob } = crunker.export(mergedAudio);
  return blob;
};

export const mergeAndDownload = async (blobs: Blob[]): Promise<void> => {
  const crunker = new Crunker();
  const audioBuffers = await crunker.fetchAudio(...blobs);
  const mergedAudio = await crunker.mergeAudio(audioBuffers);
  const { blob } = await crunker.export(mergedAudio);
  await crunker.download(blob, "audio/mp3");
};
