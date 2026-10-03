import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Welcome To Tatak RGB';
const DEFAULT_DESCRIPTION =
  'We sell the best leather made gamefowl products and accessories';
const DEFAULT_KEYWORDS =
  'gamefowl, sabong, gaffing, cockfight, cockfighting, tupada, sultada, rooster, rooster conditioning';

const Meta = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image && <meta property='og:image' content={image} />}
    </Helmet>
  );
};

export default Meta;
