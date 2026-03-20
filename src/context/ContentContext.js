import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

const CONTENT_VERSION = 'v5';

const defaultEvents = [
  {
    id: 1,
    title: 'Ambubachi Mela 2025',
    titleHi: 'अम्बुबाची मेला 2025',
    date: '2025-06-22',
    endDate: '2025-06-26',
    location: 'Kamakhya Temple, Guwahati',
    locationHi: 'कामाख्या मंदिर, गुवाहाटी',
    description:
      'The most important annual festival of Kamakhya Temple. The temple remains closed for 3 days during which Goddess Kamakhya is believed to be in menstruation (Ambubachi). Thousands of saints and devotees gather from across India.',
    descriptionHi:
      'कामाख्या मंदिर का सबसे महत्वपूर्ण वार्षिक उत्सव। मंदिर 3 दिनों के लिए बंद रहता है, जिस दौरान देवी कामाख्या को रजस्वला माना जाता है। देश भर से हजारों संत और भक्त एकत्रित होते हैं।',
    type: 'upcoming',
  },
  {
    id: 2,
    title: 'Durga Puja 2025',
    titleHi: 'दुर्गा पूजा 2025',
    date: '2025-10-01',
    endDate: '2025-10-05',
    location: 'Kamakhya Temple Complex',
    locationHi: 'कामाख्या मंदिर परिसर',
    description:
      'The grand celebration of Durga Puja at Kamakhya Temple spanning five days with elaborate rituals, music, and devotional gatherings.',
    descriptionHi:
      'कामाख्या मंदिर में दुर्गा पूजा का भव्य उत्सव पाँच दिनों तक विस्तृत अनुष्ठानों, संगीत और भक्ति समारोहों के साथ मनाया जाता है।',
    type: 'upcoming',
  },
  {
    id: 3,
    title: 'Navaratri Celebrations',
    titleHi: 'नवरात्रि उत्सव',
    date: '2025-03-30',
    endDate: '2025-04-07',
    location: 'Kamakhya Temple',
    locationHi: 'कामाख्या मंदिर',
    description:
      'Nine nights of devotion celebrating the nine forms of Goddess Durga. Special puja and havan are conducted every morning and evening.',
    descriptionHi:
      'देवी दुर्गा के नौ रूपों का जश्न मनाते हुए भक्ति की नौ रातें। हर सुबह और शाम विशेष पूजा और हवन किया जाता है।',
    type: 'upcoming',
  },
  {
    id: 4,
    title: 'Pohan Biya (Annual Marriage Ceremony)',
    titleHi: 'पोहन बिया (वार्षिक विवाह समारोह)',
    date: '2025-01-14',
    endDate: '2025-01-14',
    location: 'Kamakhya Temple',
    locationHi: 'कामाख्या मंदिर',
    description:
      'The ceremonial marriage of Lord Shiva and Goddess Kamakhya, a unique tradition observed on Makar Sankranti.',
    descriptionHi:
      'भगवान शिव और देवी कामाख्या का औपचारिक विवाह, मकर संक्रांति पर मनाई जाने वाली एक अनूठी परंपरा।',
    type: 'past',
  },
];

const defaultPhotos = [
  { id: 1, url: 'https://lh3.googleusercontent.com/pw/AP1GczNHu5R5LBruztBjBEeMBd19zzi8-myQZTyikjhBYFva-oVj564hNQkoOn2jKGbV08nouazdKEZMZV0rwAgVM9hx7OKjxeweTZPQIia3r3ItMUi1DzTc=w1200', caption: 'Maa Kamakhya Mandir — Vikaspuri Delhi', captionHi: 'माँ कामाख्या मंदिर — विकासपुरी दिल्ली' },
  { id: 2, url: 'https://lh3.googleusercontent.com/pw/AP1GczOWCjrtf6IdAm0EPKq_LBc3hhBloHXbzEjOWkUDdMH1v2uP23p6Xa352ma95Z8sZVYfmusMnIrqVcqF7gXLxPcIIet6Uj5XUUz6u9Mjkq5IOAcU62Tl=w1200', caption: 'Divine Blessings of Maa Kamakhya', captionHi: 'माँ कामाख्या का दिव्य आशीर्वाद' },
  { id: 3, url: 'https://lh3.googleusercontent.com/pw/AP1GczMx2gkHMVCSg4Ts9WBvzs-U8cA7xOvouZcFb52Un5TZwan7zECBdqunpq0j2aXwZjry5zMlB3aXjlfK_WV1UCtlAXjI1TsEllrsZNDvcIiIJQrVNtDq=w1200', caption: 'Temple Darshan', captionHi: 'मंदिर दर्शन' },
  { id: 4, url: 'https://lh3.googleusercontent.com/pw/AP1GczMn2NT_HVZXeDU_-P5JKElULC-ETQnIAOWnWg8_m68cQk1T1qjFf883LKU32RGrrMwb-xEH0hke2QYfEj0nyUcxqg2dZDfuhzPQlr7631fPMeJQ7Pbs=w1200', caption: 'Puja Rituals at the Temple', captionHi: 'मंदिर में पूजा अनुष्ठान' },
  { id: 5, url: 'https://lh3.googleusercontent.com/pw/AP1GczP_liZVI83a_5mAmFvuTumiRXEA6oI1v_MZ-EWCVsBI9E7EnwDuEhWqdjR_pVLDzp7n8ph8fb7hqgv4guhmpKflljTOKG4RY62fUij-ldPr_tAEUR4X=w1200', caption: 'Maa Kamakhya — Sacred Idol', captionHi: 'माँ कामाख्या — पवित्र मूर्ति' },
  { id: 6, url: 'https://lh3.googleusercontent.com/pw/AP1GczPm7GzVidPXkNgP4t71CkIIPBDP8HCGBsr_Xw7nuJXeowlp-L-STm-8IIyYW521Qy6xOC0zreed0cfn2SxBpHfd5-PVMkwLMdujIzkh8JseDWwiddo0=w1200', caption: 'Devotees at the Temple', captionHi: 'मंदिर में भक्तजन' },
  { id: 7, url: 'https://lh3.googleusercontent.com/pw/AP1GczOMyQNOmt7SN3b0M_w6hnIOSZ4vVyKGIYLC6-rlf6PquBCBybj66hkN686_7lcKhAgrB1UTpmEqzuD5wuwj14pxb8lYxZELDbz-mvDppOS3t9xl4zha=w1200', caption: 'Saturday Kirtan at Maa Kamakhya Mandir', captionHi: 'माँ कामाख्या मंदिर में शनिवार कीर्तन' },
  { id: 8, url: 'https://lh3.googleusercontent.com/pw/AP1GczNst0ACGWwhhRobllVA0zWWcIyxrtZbx5yXFqvFoA7fc46Cr-NAxvDDBwBpDBSOjZc6_6-1FDmw8slr8sjW4x2cUyjAB8OKHv98KgamwJukEfL8Bj6Q=w1200', caption: 'Shri Gurudev Ji Maharaj', captionHi: 'श्री गुरुदेव जी महाराज' },
  { id: 9, url: 'https://lh3.googleusercontent.com/pw/AP1GczPj4smLeM_AvMBR1U93nmNkw8TTHsA1qt7HgWaPhAc0X-pkLQN897yF3pOUZarwgxHhd8mouPSSrzgNwtBe04syjndwsgHIjNYVrL0B2z0PMIOOvGxu=w1200', caption: 'BrahmaRishi Shri Shyamanga Ji Maharaj', captionHi: 'ब्रह्मऋषि श्री श्यामाँगा जी महाराज' },
  { id: 10, url: 'https://lh3.googleusercontent.com/pw/AP1GczMkro8Or1-Oswy0zpsE1oZxDhQ2gdQE0jCmXSMeGM7hw6eQwX4xi97zz-yVkjV9al5JZm0RY686fjMopym5BZworGQg9l2k2IBqOvkWndVXboQjDTb8=w1200', caption: 'Temple Satsang', captionHi: 'मंदिर सत्संग' },
  { id: 11, url: 'https://lh3.googleusercontent.com/pw/AP1GczNHdfRkowPB5KZTsTDZm0CJKDJBzqO-2dud9To61uiuZBlAD1c94pNluvsQsCIBb-zQ92Br1aCT9F9qNuawpVgP8ZAPVjiD0_EvI4roSmSEi4EFJT1d=w1200', caption: 'Temple Prayer Gathering', captionHi: 'मंदिर प्रार्थना सभा' },
  { id: 12, url: 'https://lh3.googleusercontent.com/pw/AP1GczPjOfa5n5T5U3ct_uOS4rUkwAm-aNDgqFcnkB8NVfEmmYtoPdebJJEa0PTZgE_sIFK6f5faNd1ZYcyAVQXQO_0kuAsosyldEDSoU0tLu0A1mFcoLCMd=w1200', caption: 'Divine Prashad Distribution', captionHi: 'दिव्य प्रसाद वितरण' },
  { id: 13, url: 'https://lh3.googleusercontent.com/pw/AP1GczNgGocKrGHzGnjcSfU_PEqHrAuKHKV4Gxot1ZfAnyxMngtM_2wdtxPLovmdYRnJ_rIvxeBQy3cY1W-Yjc2Jdwr72RiapPD8fBcJp0gO01KF--Kef6jo=w1200', caption: 'Bhajan & Kirtan Session', captionHi: 'भजन और कीर्तन सत्र' },
  { id: 14, url: 'https://lh3.googleusercontent.com/pw/AP1GczNNtUKA9LsxBIlxT8reZ1gN06vz1iVCoG4L-83VxINm_7L34qxzizUzL5_agjSxWIsvczG6UZ40cDQbjSVEKAaWrJABqs3ZfYVDjJka9uHJdnAhmR_z=w1200', caption: 'Spiritual Discourse', captionHi: 'आध्यात्मिक प्रवचन' },
  { id: 15, url: 'https://lh3.googleusercontent.com/pw/AP1GczN0VDhykB5wnOQaSjdYmIQ4J7Qqs02HBxsVxMwJjf9wZPiAeoWbtrweQ1o8Gz5Ke1pQsF74sh7sVTOAcL9TahVb1tNUL0adXKsEDisa_R2s5_6VRm_X=w1200', caption: 'Maa Kamakhya Aarti', captionHi: 'माँ कामाख्या आरती' },
  { id: 16, url: 'https://lh3.googleusercontent.com/pw/AP1GczMXKvGI5GNN0hte9GS931PIE7_k1jYwkiepDVDBGiZ-BMTurnoMK0_gVo9Ej9t7Z3-UhQ5A3QmHK8b3VzJscKgqgceO4GR6T2ca43VKli0PYKo5H0Ed=w1200', caption: 'Sacred Temple Premises', captionHi: 'पवित्र मंदिर परिसर' },
  { id: 17, url: 'https://lh3.googleusercontent.com/pw/AP1GczMIVRlCLP14WW3BlLu1ABM1l_g4EGn-fROJlzGjVbc5jXj8urA5t7MbcRcsOMGD7Pd8csIX97XXN53dH2Mt-hyuogADBswVNIFqCZd1Zleimy29UAW5=w1200', caption: 'Temple Interior', captionHi: 'मंदिर का अंदरूनी भाग' },
  { id: 18, url: 'https://lh3.googleusercontent.com/pw/AP1GczMLvHRIYWs9XanL0fffwaYqA_rxt4ybVHjA7hdtzml_7jUskxyygr4-Vw0PNF-C1EskeWEWkdexCFJm7MDev31zdaSNJ_RU36p6Q4G-ZgyTyzKE7-XO=w1200', caption: 'Weekly Kirtan Program', captionHi: 'साप्ताहिक कीर्तन कार्यक्रम' },
  { id: 19, url: 'https://lh3.googleusercontent.com/pw/AP1GczNJreXd9rkjjUh8gEwfccSK7A3oGKSc9SIdDNQj4quWmLiEJhUhbgKOlGeyqcpt2vxLAKX5HmyrTAkfqbcCAoPQtWIMVrX239d0k8B-2WRum9v1qNOf=w1200', caption: 'Maa Kamakhya Seva', captionHi: 'माँ कामाख्या सेवा' },
  { id: 20, url: 'https://lh3.googleusercontent.com/pw/AP1GczMIoRx_7eY8EwvoQHON6tFeJub4v2xmo4eXUttOjGUIDf9u_ocHabuU-zTSoT0ZLyflpsUMcENonZ85Aovv3baQTJzpTMqWbDmrVD2TSC6gkobs4bUC=w1200', caption: 'Festival Celebrations', captionHi: 'त्योहार समारोह' },
  { id: 21, url: 'https://lh3.googleusercontent.com/pw/AP1GczN50Aqdhri_i-0UF5I_rGMccNogAP7RcMICNmfOEtS05kgFi9kRf_PQVATC81A1z6YCecUWxpLK1rMmPblbXOiWiWiF85SA4G_Ea2GsLW6_t1jt9MfD=w1200', caption: 'Devotees in Prayer', captionHi: 'प्रार्थना में भक्तजन' },
  { id: 22, url: 'https://lh3.googleusercontent.com/pw/AP1GczNw8nSsLw9UvbasUqtkur0NRnSeRYU44F8I2VxChdtl9yZpqCyma9zxbYyOHHWuPy0ZY_HeJukB8izj-dRuRgIJ7oPt9MO9KVqGTDXv4eEAtuCAFPM8=w1200', caption: 'Temple Grounds', captionHi: 'मंदिर का प्रांगण' },
  { id: 23, url: 'https://lh3.googleusercontent.com/pw/AP1GczOW3wbJcFhSn-XCCGjfjXodDkOHZ53INIMrDHJaMzSc2zTMlG307-2xZ2GPyTZmqruY5XLeE1ca0EWp_WglEGsMBddFUQGbGbvg6ngG_OrgJiF7nmhg=w1200', caption: 'Mantra Chanting', captionHi: 'मंत्र जाप' },
  { id: 24, url: 'https://lh3.googleusercontent.com/pw/AP1GczP4HuujC132i9YkHO93bdur_9sdat2h31baXptJVrLSjNR-NHFj81s4vka4gvTi629oU5moV-fH5YgLlekNw2UefD6VDd29voFo2jiL_JZde9Gg3QCj=w1200', caption: 'Havan (Sacred Fire Ritual)', captionHi: 'हवन (पवित्र अग्नि अनुष्ठान)' },
  { id: 25, url: 'https://lh3.googleusercontent.com/pw/AP1GczPwNITflBrxL5ARF3yTaUJADCu8e8_wOC8zLsQtsB-1ihFTHVNvHu_PuQCEedbycFvnUiWgNRkR4L66IPZl_J2ZNJRJBx8gBghD_Zok3iMWgRiBDJau=w1200', caption: 'Community Gathering', captionHi: 'सामुदायिक सभा' },
  { id: 26, url: 'https://lh3.googleusercontent.com/pw/AP1GczM9BGt7yyKMwnL4AcLmeBZyz2zXBCM0Cl8DBiB9k-7Sn0pRnhnAM24xQSOjDSie_hxFKdEpsUJ6Ptv6p4nMaRUS7-zbrdLxvHZXnj2CgGWxlzxcYfbk=w1200', caption: 'JG-1 62B Vikaspuri — Temple View', captionHi: 'जेजी-1 62बी विकासपुरी — मंदिर दृश्य' },
  { id: 27, url: 'https://lh3.googleusercontent.com/pw/AP1GczOOB-a_gGpbS4SuxBfBN647N19Ik0187W-LEcmPWMngxE0zDMyVJkPaLNay7aqHwpQTgVwJ-Pn9vMnkNeUdkSuKGARdYVt6vl7E1kzDSSikfxmS7KNO=w1200', caption: 'Moksha Dham — Sacred Space', captionHi: 'मोक्ष धाम — पवित्र स्थान' },
  { id: 28, url: 'https://lh3.googleusercontent.com/pw/AP1GczNuP6dBe9JiOtZiXz8vL_RMjKRspHOqYKiM9jzoAcFsOlEIDBckuoTXdr9nqwClq1Q12RzbprMczYLqeBxJUOspEYTg45ymIV_mDDK4zxhQDUFSxE-2=w1200', caption: 'Spiritual Initiation Ceremony', captionHi: 'दीक्षा समारोह' },
  { id: 29, url: 'https://lh3.googleusercontent.com/pw/AP1GczP8Y7U7KaK9QcNF5j6tMBAoxbJMdvdu2OMmO234oyeZ4Yd83S-R6Pjqs48LYM0WlnASRHlaX6qhVJauLHhos6dcA2EF3JHsxadHZvD7b8BX7SlHfm8F=w1200', caption: 'Blessed Gathering at Mandir', captionHi: 'मंदिर में आशीर्वाद सभा' },
  { id: 30, url: 'https://lh3.googleusercontent.com/pw/AP1GczOIR1dhKceniLvbeNToV6S6sYqrQJy7yL3Evn9CThVmXOEYwDudEnZyZLEnAYkrTeKVC56GhUSKSPPvbQVp_3N-CbhGjwhrWOzjFvGJQR7Tys2MKwXU=w1200', caption: 'Maa Kamakhya Devi — New Delhi', captionHi: 'माँ कामाख्या देवी — नई दिल्ली' },
];

const defaultVideos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/3ntAoYmPqpg',
    caption: 'Maa Kamakhya Mandir — Darshan',
    captionHi: 'माँ कामाख्या मंदिर — दर्शन',
    type: 'youtube',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/FcCsCk3M1pE',
    caption: 'Maa Kamakhya — Divine Blessings',
    captionHi: 'माँ कामाख्या — दिव्य आशीर्वाद',
    type: 'youtube',
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/Eng4VuWfZG0',
    caption: 'Maa Kamakhya Mandir — Vikaspuri Delhi',
    captionHi: 'माँ कामाख्या मंदिर — विकासपुरी दिल्ली',
    type: 'youtube',
  },
  {
    id: 4,
    url: 'https://www.youtube.com/embed/V90ZXIKNIms',
    caption: 'Kirtan at Maa Kamakhya Mandir',
    captionHi: 'माँ कामाख्या मंदिर में कीर्तन',
    type: 'youtube',
  },
  {
    id: 5,
    url: 'https://www.youtube.com/embed/YXpUQIDZeUM',
    caption: 'Maa Kamakhya — Moksha Sandesh',
    captionHi: 'माँ कामाख्या — मोक्ष संदेश',
    type: 'youtube',
  },
  {
    id: 6,
    url: 'https://www.youtube.com/embed/-jpfm8HSgfA',
    caption: 'Gurudev Ji Maharaj — Pravachan',
    captionHi: 'गुरुदेव जी महाराज — प्रवचन',
    type: 'youtube',
  },
  {
    id: 7,
    url: 'https://www.youtube.com/embed/dN1Pb_S3wjo',
    caption: 'Shri Shyamanga Ji Maharaj — Satsang',
    captionHi: 'श्री श्यामाँगा जी महाराज — सत्संग',
    type: 'youtube',
  },
];

export function ContentProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
    if (localStorage.getItem('kamakhya_version') !== CONTENT_VERSION) {
      localStorage.removeItem('kamakhya_photos');
      localStorage.removeItem('kamakhya_videos');
      localStorage.removeItem('kamakhya_events');
      localStorage.setItem('kamakhya_version', CONTENT_VERSION);
    }
    const saved = localStorage.getItem('kamakhya_photos');
    return saved ? JSON.parse(saved) : defaultPhotos;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('kamakhya_videos');
    return saved ? JSON.parse(saved) : defaultVideos;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('kamakhya_events');
    return saved ? JSON.parse(saved) : defaultEvents;
  });

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('kamakhya_theme') || '#8B1A1A';
  });

  const savePhotos = (newPhotos) => {
    setPhotos(newPhotos);
    localStorage.setItem('kamakhya_photos', JSON.stringify(newPhotos));
  };

  const saveVideos = (newVideos) => {
    setVideos(newVideos);
    localStorage.setItem('kamakhya_videos', JSON.stringify(newVideos));
  };

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem('kamakhya_events', JSON.stringify(newEvents));
  };

  const addPhoto = (photo) => {
    const updated = [...photos, { ...photo, id: Date.now() }];
    savePhotos(updated);
  };

  const deletePhoto = (id) => {
    const updated = photos.filter((p) => p.id !== id);
    savePhotos(updated);
  };

  const addVideo = (video) => {
    const updated = [...videos, { ...video, id: Date.now() }];
    saveVideos(updated);
  };

  const deleteVideo = (id) => {
    const updated = videos.filter((v) => v.id !== id);
    saveVideos(updated);
  };

  const addEvent = (event) => {
    const updated = [...events, { ...event, id: Date.now() }];
    saveEvents(updated);
  };

  const deleteEvent = (id) => {
    const updated = events.filter((e) => e.id !== id);
    saveEvents(updated);
  };

  const updateThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem('kamakhya_theme', color);
  };

  return (
    <ContentContext.Provider
      value={{
        photos,
        videos,
        events,
        themeColor,
        addPhoto,
        deletePhoto,
        addVideo,
        deleteVideo,
        addEvent,
        deleteEvent,
        updateThemeColor,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
