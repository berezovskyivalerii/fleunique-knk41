interface FeatureCardProps {
  image: string;
  title: string;
  desc: string;
}

export function FeatureCard({ image, title, desc }: FeatureCardProps) {
  return (
    <div className="flex flex-row gap-[16px] md:flex-col w-full md:w-[180px] lg:w-[224px] items-center lg:items-start shrink-0">
      <img
        src={image}
        alt={title}
        className="w-[92px] md:w-[180px] lg:w-full aspect-square object-cover rounded-[16px]"
      />
      <div className="flex flex-col w-full gap-1">
        <h4 className="font-pt-sans font-bold text-forest-300 text-headline-3 text-left">
          {title}
        </h4>
        <p className="font-montserrat! font-medium text-forest-200 text-base leading-tight text-left">
          {desc}
        </p>
      </div>

    </div>
  );
}
