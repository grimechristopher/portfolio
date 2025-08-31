import type { Schema, Struct } from '@strapi/strapi';

export interface BulletsExperience extends Struct.ComponentSchema {
  collectionName: 'components_bullets_experiences';
  info: {
    displayName: 'Experience';
    icon: 'bulletList';
  };
  attributes: {
    Location: Schema.Attribute.String;
    StartDate: Schema.Attribute.Date;
    Title: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['Work', 'Education']>;
  };
}

export interface BulletsSkill extends Struct.ComponentSchema {
  collectionName: 'components_bullets_skills';
  info: {
    displayName: 'Skill';
    icon: 'apps';
  };
  attributes: {
    Color: Schema.Attribute.String;
    Svg: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    Viewbox: Schema.Attribute.String;
  };
}

export interface GeneralAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_general_about_sections';
  info: {
    displayName: 'About Section';
    icon: 'emotionHappy';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
    Title: Schema.Attribute.String;
  };
}

export interface GeneralSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_general_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'discuss';
  };
  attributes: {
    FontAwesomeIconClass: Schema.Attribute.String;
    Link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'bullets.experience': BulletsExperience;
      'bullets.skill': BulletsSkill;
      'general.about-section': GeneralAboutSection;
      'general.social-link': GeneralSocialLink;
    }
  }
}
