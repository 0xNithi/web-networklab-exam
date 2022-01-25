import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';
import { supabase } from 'utils/supabaseClient';

import Navbar from 'components/Navbar';
import Question from 'components/Question';
import Timer from 'components/Timer';

const Exam: NextPage<any> = ({ user, questions, startTime }) => {
  const [timeOutStatus, setTimeOutStatus] = useState(false);
  const timOutStatusHandler = () => {
    setTimeOutStatus(true);
  };

  return (
    <>
      <Navbar user={user} />
      <main>
        <Question questions={questions} user={user} timeOutStatus={timeOutStatus} />
        <Timer startTime={startTime} onTimeOut={timOutStatusHandler} />
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  const submission = await fetch(`http://localhost:3000/api/submission`, {
    headers: req!.headers as HeadersInit,
  }).then((res) => (res.status == 200 ? res.json() : null));

  if (submission !== null) {
    return { props: {}, redirect: { destination: '/' } };
  }

  const { started_at } = await fetch(`http://localhost:3000/api/logs`, {
    headers: req!.headers as HeadersInit,
  }).then(async (res) =>
    res.status == 200
      ? res.json()
      : await fetch(`http://localhost:3000/api/logs`, {
          method: 'POST',
          headers: req!.headers as HeadersInit,
        }).then((res) => res.json()),
  );

  const questions = await (
    await fetch(`http://localhost:3000/api/questions`, {
      headers: req!.headers as HeadersInit,
    })
  ).json();

  return {
    props: {
      user,
      questions,
      startTime: started_at,
    },
  };
};

export default Exam;
