import React, { useEffect } from 'react';
import { iif, of } from 'rxjs';
import {
  tap, catchError, map,
} from 'rxjs/operators';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '@material-ui/core/Container';
// Components
import Page from '../../components/Wrappers/Page';
// assets
import styles from '../../assets/sass/Profile.scss';
// utils
import request from '../../../shared/utils/Request';
import { saveProfile } from '../../../shared/actions/profileActions';


const fetchProfile$ = (username, headers, completeFn, res) => request({
  url: `/api/user/show/${username}`,
  headers,
}).pipe(
  map(r => r.response),
  tap(completeFn),
  catchError(() => {
    if (res) res.redirect('/');
    return of(null);
  }),
);

const Profile = ({ profile: { data }, match, saveProfile: sProfile }) => {
  useEffect(() => {
    if (!data) {
      fetchProfile$(
        match.params.username,
        {},
        () => null,
      ).subscribe(response => sProfile(response.data));
    }
  }, [data, match, sProfile]);

  return (
    <Page title="Profile">
      <Container fixed>
        <section className={styles.sectionInfo}>
          <h2>{data?.username}</h2>
          <h4>{data?.email}</h4>
          <p>{data?.createdAt}</p>
        </section>
        <article>
          <p>
            {data?.description}
          </p>
        </article>
      </Container>
    </Page>
  );
};

Profile.initialAction = ({ dispatch }, match, req, res) => iif(
  () => req.session && req.session.isAuthenticated,
  fetchProfile$(
    match.params.username,
    { Authorization: process.env.SECRET },
    response => dispatch(saveProfile(response.data)),
    res
  ),
  of('Unauthenticated').pipe(tap(() => res.redirect('/')))
);


export default Profile;
