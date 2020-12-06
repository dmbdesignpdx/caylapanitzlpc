'use strict';

module.exports = (dato, root) => {
  const { home, contact, footer, site } = dato;
  const { siteName, titleSuffix, fallbackSeo } = site.globalSeo;

  const sections = home.sections.map(item => ({
    heading: item.heading,
    copy: item.copy,
    image: {
      url: item.image.url(),
      alt: item.image.alt || '',
    },
  }));

  const feesinsurance = home.feesInsurance.map(item => ({
    heading: item.heading,
    list: item.list,
  }));

  const nav = [
    ...sections.map(item => item.heading),
    'About',
    'Fees/Insurance',
  ];

  root.createDataFile('data/site.yaml', 'yaml', {
    title: siteName,
    suffix: titleSuffix,
    description: fallbackSeo.description,
    nav,
  });

  root.createDataFile('data/contact.yaml', 'yaml', {
    email: contact.email,
    phone: contact.phone,
    fax: contact.fax,
    street: contact.street,
    city: contact.city,
    state: contact.state,
    zip: contact.zip,
  });

  root.createDataFile('data/footer.yaml', 'yaml', {
    resources: {
      title: footer.title,
      organizations: footer.organizations.map(org => ({
        name: org.name,
        number: org.number,
      })),
    },
    copyright: footer.copyright,
  });

  root.createPost('content/_index.md', 'yaml', {
    frontmatter: {
      title: home.title,
      description: home.description,
      shero: {
        heading: home.shero.heading,
        copy: home.shero.copy,
        image: home.shero.image.url(),
      },
      sections,
      feesinsurance,
    },
    content: home.about.content,
  });
};
