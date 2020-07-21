
import React from "react";
import useTranslation from '../hooks/useTranslation'



function AboutMe() {
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac')
  const { t } = useTranslation()

  return (
    <div className="col-sm-8">
      <h3>{t('AboutMe')}</h3>
      <p>{t(description)}</p>
    </div>
  );
}
export default AboutMe;
