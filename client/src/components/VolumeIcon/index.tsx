import Image from "next/image";

const VolumeIcon = ({ volume }: { volume: number }) => {
  let src = "/icons/volume-high.svg";
  if (volume === 0) {
    src = "/icons/volume-off.svg";
  } else if (volume < 50) {
    src = "/icons/volume-low.svg";
  }
  console.log(volume);

  return <Image src={src} height={40} width={40} alt="Adjust volume" />;
};

export default VolumeIcon;
