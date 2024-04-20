export declare async function generateMusic(
  onProgress: (data: any) => void,
  prompt: string,
  temperature: number,
  duration: number,
): Promise<Blob>;
