import Crunker from "crunker"

export const mergeIntoBlob = async (blobs: Blob[]): Promise<Blob> => {
    const crunker = new Crunker()
    const audioBuffers = await Promise.all(blobs.map(b => crunker.fetchAudio(b)));
    const mergedAudio = await crunker.mergeAudio(audioBuffers.flat());
    const {blob} = crunker.export(mergedAudio)
    return blob;
}

export const mergeAndDownload = async (blobs: Blob[]): Promise<void> => {
    const crunker = new Crunker()
    const audioBuffers = await Promise.all(blobs.map(b => crunker.fetchAudio(b)));
    const mergedAudio = await crunker.mergeAudio(audioBuffers.flat());
    const {blob} = await crunker.export(mergedAudio)
    await crunker.download(blob, 'audio/mp3')
}