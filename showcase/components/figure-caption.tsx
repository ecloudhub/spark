interface FigureCaptionProps {
  image: {
    url: string;
    alt?: string;
  };
  title: string;
  description: string;
}

export default function FigureCaption({
  image,
  title,
  description,
}: FigureCaptionProps) {
  return (
    <div className="figure-caption">
      <img
        className="figure-caption-img"
        src={image.url}
        alt={image.alt ?? ""}
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
