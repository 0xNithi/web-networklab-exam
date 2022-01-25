import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';

import Navbar from 'components/Navbar';
import Logo from 'components/Logo';
import { supabase } from 'utils/supabaseClient';

const Home: NextPage<{ user: User; isSubmit: boolean; isStart: boolean }> = ({ user, isSubmit, isStart }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col items-center w-5/6 p-8 mx-auto mt-32 text-xl bg-white border rounded dark:bg-slate-800 md:w-3/4 lg:w-2/4">
        <Logo />
        <div className="w-full p-4 mt-4 border rounded-lg">
          <div className="mb-4 text-2xl font-bold text-center">กรุณาอ่านคำอธิบายให้เข้าใจ ก่อนลงมือทำข้อสอบ</div>
          <p>1. ข้อสอบมีจำนวน 2 ตอน</p>
          <p className="ml-4">
            1.1 <u>ตอนที่ 1</u> เป็นข้อสอบปรนัย มีทั้งหมด 29 ข้อ
          </p>
          <p className="ml-4">
            1.2 <u>ตอนที่ 2</u> เป็นข้อสอบอัตนัย มีทั้งหมด 9 ข้อ
          </p>
          <p>2. มีเวลาในการสอบจำนวน 1 ชั่วโมง 30 นาที</p>
          <p>3. เมื่อสอบเสร็จให้กดปุ่มส่งข้อสอบ</p>
          <p className="ml-4">3.1 เมื่อส่งข้อสอบแล้วจะไม่สามารถกลับมาแก้ไขคำตอบได้</p>
          <p>4. ไม่อนุญาตให้ใช้เครื่องมือหรืออุปกรณ์ในการค้นหาคำตอบจากภายนอก</p>
          <div className="flex flex-col items-center my-8">
            {isSubmit ? (
              <button className="p-4 text-lg font-bold text-black bg-red-500 rounded-lg opacity-50 cursor-not-allowed focus:outline-none">
                คำตอบถูกส่งไปเเล้ว
              </button>
            ) : (
              <Link href="/exam">
                <button className="p-4 text-lg font-bold text-black transition duration-300 ease-in-out transform bg-green-400 rounded-lg focus:outline-none hover:bg-green-500 active:bg-green-600 hover:scale-105 active:scale-95">
                  {isStart ? 'ทำข้อสอบต่อ' : 'เริ่มทำข้อสอบ'}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user || !user.email?.endsWith('@kmitl.ac.th')) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  const submission = await fetch(`http://localhost:3000/api/submission`, {
    headers: req!.headers as HeadersInit,
  }).then((res) => (res.status == 200 ? true : false));

  const started_at = await fetch(`http://localhost:3000/api/logs`, {
    headers: req!.headers as HeadersInit,
  }).then((res) => (res.status == 200 ? true : false));

  return {
    props: {
      user,
      isSubmit: submission,
      isStart: started_at,
    },
  };
};

export default Home;
