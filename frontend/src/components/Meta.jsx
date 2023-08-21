import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Tatak RGB',
  description:
    'We sell the best leather made gamefowl products and accessories',
  keywords:
    'gamefowl, sabong, gaffing, cockfight, cockfighting, tupada, sultada, rooster, rooster conditioning',
};

export default Meta;
