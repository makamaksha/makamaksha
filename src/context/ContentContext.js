import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

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
  {
    id: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Kamakhya_Temple_6.jpg/1280px-Kamakhya_Temple_6.jpg',
    caption: 'Kamakhya Temple Main Entrance',
    captionHi: 'कामाख्या मंदिर मुख्य प्रवेश द्वार',
  },
  {
    id: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kamakhya_temple_guwahati.jpg/1280px-Kamakhya_temple_guwahati.jpg',
    caption: 'Aerial View of Kamakhya Temple',
    captionHi: 'कामाख्या मंदिर का हवाई दृश्य',
  },
  {
    id: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Kamakhya_temple.jpg/1280px-Kamakhya_temple.jpg',
    caption: 'The Sacred Nilachal Hill',
    captionHi: 'पवित्र नीलाचल पर्वत',
  },
  {
    id: 4,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kamakhya_Temple_Entrance.jpg/1280px-Kamakhya_Temple_Entrance.jpg',
    caption: 'Temple Entrance Gate',
    captionHi: 'मंदिर प्रवेश द्वार',
  },
  {
    id: 5,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kamakhya_temple_during_Ambubachi_Mela.jpg/1280px-Kamakhya_temple_during_Ambubachi_Mela.jpg',
    caption: 'Ambubachi Mela Celebrations',
    captionHi: 'अम्बुबाची मेला उत्सव',
  },
  {
    id: 6,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kamakhya_temple_interior.jpg/1280px-Kamakhya_temple_interior.jpg',
    caption: 'Inside the Temple Complex',
    captionHi: 'मंदिर परिसर के अंदर',
  },
  {
    id: 7,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nilachal_Hill_Guwahati.jpg/1280px-Nilachal_Hill_Guwahati.jpg',
    caption: 'Nilachal Hill — Guwahati',
    captionHi: 'नीलाचल पहाड़ी — गुवाहाटी',
  },
  {
    id: 8,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kamakhya_Devi.jpg/800px-Kamakhya_Devi.jpg',
    caption: 'Maa Kamakhya Devi',
    captionHi: 'माँ कामाख्या देवी',
  },
  {
    id: 9,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Brahmaputra_River_Guwahati.jpg/1280px-Brahmaputra_River_Guwahati.jpg',
    caption: 'Brahmaputra River View from Nilachal',
    captionHi: 'नीलाचल से ब्रह्मपुत्र नदी का दृश्य',
  },
];

const defaultVideos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/nCFJq4LKIO0',
    caption: 'Kamakhya Mandir Darshan',
    captionHi: 'कामाख्या मंदिर दर्शन',
    type: 'youtube',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/Hy9tHBB_EPs',
    caption: 'Ambubachi Mela at Kamakhya',
    captionHi: 'कामाख्या में अम्बुबाची मेला',
    type: 'youtube',
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/4H0oZ0UVBKE',
    caption: 'Kamakhya Temple Aarti',
    captionHi: 'कामाख्या मंदिर आरती',
    type: 'youtube',
  },
  {
    id: 4,
    url: 'https://www.youtube.com/embed/kx8nqsWmvXw',
    caption: 'History of Kamakhya Mandir',
    captionHi: 'कामाख्या मंदिर का इतिहास',
    type: 'youtube',
  },
  {
    id: 5,
    url: 'https://www.youtube.com/embed/WGh4PUKcY0U',
    caption: 'Navaratri Celebrations at Kamakhya',
    captionHi: 'कामाख्या में नवरात्रि उत्सव',
    type: 'youtube',
  },
];

export function ContentProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
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
