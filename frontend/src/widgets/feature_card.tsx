interface FeatureCardProps {
  image: string;
  title: string;
  desc: string;
}

export function FeatureCard({ image, title, desc }: FeatureCardProps) {
  return (
    <div className="flex flex-col w-full lg:w-[224px] items-center lg:items-start shrink-0">
      <img
        src={image}
        alt={title}
        className="w-[180px] lg:w-full aspect-square object-cover rounded-[16px] mb-4 "
      />
      <h4 className="font-pt-sans font-bold text-forest-300 text-headline-3 mb-1 text-center lg:text-left">
        {title}
      </h4>
      <p className="font-montserrat! font-medium text-forest-200 text-base leading-tight text-center lg:text-left">
        {desc}
      </p>
    </div>
  );
}
