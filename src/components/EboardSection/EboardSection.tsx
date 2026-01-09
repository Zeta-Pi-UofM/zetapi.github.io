import React from 'react';
import styles from './EboardSection.module.css';
import EboardMember from './EboardMember';
import ImagePreloader from './ImagePreloader';

const eboard = [
  { image: '/images/headshots/abby_m.jpg',  name: 'Abby Moomaw',     position: 'President',                           major: 'Computer Science',  graduation: '2027', linkedin: 'https://www.linkedin.com/in/abby-moomaw-261a7b2a2/',                         email: 'amoomaw@umich.edu' },
  { image: '/images/headshots/catherine_f.jpg', name: 'Catherine Fan',   position: 'Vice President',                       major: 'Computer Science', graduation: '2028', linkedin: 'https://www.linkedin.com/in/catherine-fan-7aa440326/',               email: 'cathyfan@umich.edu' },
  { image: '/images/headshots/emily_l.jpg',     name: 'Emily Lin',    position: 'Director of DEI',                       major: 'Computer Engineering',              graduation: '2027', linkedin: 'https://www.linkedin.com/in/emily-lin850/',      email: 'emjlin@umich.edu' },
  { image: '/images/headshots/ananthu_n.jpg',    name: 'Ananthu Nair',    position: 'Co-Head of Recruitment & Membership',   major: 'Information Analysis and Design',       graduation: '2027', linkedin: 'https://www.linkedin.com/in/ananthu-j-nair/',               email: 'nairanan@umich.edu' },
  { image: '/images/headshots/zachary_g.jpg',   name: 'Zachary Gammo',   position: 'Co-Head of Recruitment & Membership',   major: 'Industrial and Operations Engineering',       graduation: '2027', linkedin: 'https://www.linkedin.com/in/zachary-gammo/',              email: 'zgammo@umich.edu' },
  { image: '/images/headshots/andrew_h.jpg',  name: 'Andrew Hou',    position: 'Head of Social',                     major: 'Computer Science',              graduation: '2028', linkedin: 'https://www.linkedin.com/in/andrew-yabo-hou/',                           email: 'andhou@umich.edu' },
  { image: '/images/headshots/amy_l.jpg',  name: 'Amy Lee',  position: 'Head of Marketing',                     major: 'Data Science',       graduation: '2028', linkedin: 'https://www.linkedin.com/in/amylee-data/',              email: 'amyllee@umich.edu' },
  { image: '/images/headshots/george_g.jpg',    name: 'George Gu',     position: 'Head of Professional Development',      major: 'Computer Science',    graduation: '2027', linkedin: 'www.linkedin.com/in/george-gu-146bb0251',        email: 'georgu@umich.edu' },
  { image: '/images/headshots/biplav_k.jpg', name: 'Biplav Kharel',  position: 'Head of Tech',                          major: 'Data Science',           graduation: '2027', linkedin: 'https://www.linkedin.com/in/biplavkharel/',                          email: 'khbiplav@umich.edu' },
  { image: '/images/headshots/anthony_n.jpg',      name: 'Anthony Nguyen',        position: 'Head of Fundraising',                   major: 'Data Science',       graduation: '2028', linkedin: 'https://www.linkedin.com/in/anthony-nguyen-0539a4317/',                 email: 'anthenzo@umich.edu' }
];

// Keep desktop grouping: 3, 4, 4
const rows = [
  eboard.slice(0, 3),
  eboard.slice(3, 7),
  eboard.slice(7, 11),
];

const EboardSection: React.FC = () => {
  const imageUrls = eboard.map(m => m.image);

  return (
      <>
        <ImagePreloader images={imageUrls} />
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.gridRow}>
                  {row.map((member, idx) => (
                      <div
                          key={member.name}
                          className={styles.fadeIn}
                          style={{ animationDelay: `${(rowIndex * 4 + idx) * 0.05}s` }}
                      >
                        <EboardMember {...member} />
                      </div>
                  ))}
                </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default EboardSection;