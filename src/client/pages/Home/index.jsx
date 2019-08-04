import React, { useEffect, useState, useRef } from 'react';
import root from 'window-or-global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '@material-ui/core/Container';
import { fromEvent } from 'rxjs';
// Components
import Page from '../../components/Wrappers/Page';
// assets
import styles from '../../assets/sass/App.scss';
import mountain1 from '../../assets/img/mountain1.png';
import mountain2 from '../../assets/img/mountain2.png';


const Home = () => {
  const [scroll, setScroll] = useState(root?.pageYOffset);
  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    const scroll$ = fromEvent(root, 'scroll').subscribe(() => {
      setScroll(root?.pageYOffset);
      layer1.current.style.width = `${100 + scroll / 5}%`;
      layer2.current.style.width = `${100 + scroll / 5}%`;
      layer2.current.style.left = `${scroll / 50}%`;
      text.current.style.top = `-${scroll / 10}%`;
    });
    return () => scroll$.unsubscribe();
  }, [scroll, layer1, layer2, text]);
  return (
    <Page>
      <div>
        <section className={styles.zoom}>
          <img src={mountain1} alt="layer" className={styles.layer1} ref={layer1} />
          <img src={mountain2} alt="layer" className={styles.layer2} ref={layer2} />
          <div className={styles.text} ref={text}>
            <h1>Conversational</h1>
          </div>
        </section>
        <Container fixed>
          <h2>
            <FontAwesomeIcon icon="comment-dots" />
            {' Categories'}
          </h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia asperiores omnis ea ducimus consequuntur cum molestiae, rem ratione, dolorem temporibus ex laudantium tempora aliquid delectus provident inventore. Soluta, sit.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea in maiores nostrum quam vero, earum eveniet itaque consectetur minima ullam? In veniam saepe totam aliquid inventore, vitae reiciendis quia quis et libero, omnis ut itaque perspiciatis tempora odio numquam? Assumenda cum nulla non tempora consequuntur accusantium recusandae aut, quasi quis animi, tempore est explicabo, eveniet voluptas magni labore molestiae adipisci? Dolor, sequi, suscipit rem impedit consequuntur ipsum nostrum aut exercitationem animi a hic, illum ut temporibus in molestiae incidunt officiis eius. Aperiam possimus illo quis sit. Ratione, asperiores cum. Architecto officiis optio quae delectus vero ipsa tempore, numquam aut atque.
          </p>
          <br />
          <h2>
            <FontAwesomeIcon icon="comment" />
            {' Chats'}
          </h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea in maiores nostrum quam vero, earum eveniet itaque consectetur minima ullam? In veniam saepe totam aliquid inventore, vitae reiciendis quia quis et libero, omnis ut itaque perspiciatis tempora odio numquam? Assumenda cum nulla non tempora consequuntur accusantium recusandae aut, quasi quis animi, tempore est explicabo, eveniet voluptas magni labore molestiae adipisci? Dolor, sequi, suscipit rem impedit consequuntur ipsum nostrum aut exercitationem animi a hic, illum ut temporibus in molestiae incidunt officiis eius. Aperiam possimus illo quis sit. Ratione, asperiores cum. Architecto officiis optio quae delectus vero ipsa tempore, numquam aut atque.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea in maiores nostrum quam vero, earum eveniet itaque consectetur minima ullam? In veniam saepe totam aliquid inventore, vitae reiciendis quia quis et libero, omnis ut itaque perspiciatis tempora odio numquam? Assumenda cum nulla non tempora consequuntur accusantium recusandae aut, quasi quis animi, tempore est explicabo, eveniet voluptas magni labore molestiae adipisci? Dolor, sequi, suscipit rem impedit consequuntur ipsum nostrum aut exercitationem animi a hic, illum ut temporibus in molestiae incidunt officiis eius. Aperiam possimus illo quis sit. Ratione, asperiores cum. Architecto officiis optio quae delectus vero ipsa tempore, numquam aut atque.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea in maiores nostrum quam vero, earum eveniet itaque consectetur minima ullam? In veniam saepe totam aliquid inventore, vitae reiciendis quia quis et libero, omnis ut itaque perspiciatis tempora odio numquam? Assumenda cum nulla non tempora consequuntur accusantium recusandae aut, quasi quis animi, tempore est explicabo, eveniet voluptas magni labore molestiae adipisci? Dolor, sequi, suscipit rem impedit consequuntur ipsum nostrum aut exercitationem animi a hic, illum ut temporibus in molestiae incidunt officiis eius. Aperiam possimus illo quis sit. Ratione, asperiores cum. Architecto officiis optio quae delectus vero ipsa tempore, numquam aut atque.
          </p>
          <br />
        </Container>
      </div>
    </Page>
  );
};

// Home.initialAction = (...params) => {
//   console.log(params);
//   return {
//     type: 'adsasdasd',
//   };
// };

export default Home;
