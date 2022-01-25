import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AlertModal from 'components/AlertModal';

const Question = (props) => {
  const router = useRouter();

  const [showAlertModal, setShowAlertModal] = useState(false);

  const [questions, setQuestions] = useState(props.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const choiceHandler = (value) => {
    let question = [...questions];
    question[currentQuestion] = {
      ...question[currentQuestion],
      answer: value,
    };
    setQuestions(question);
  };
  const textHandler = (event) => {
    let question = [...questions];
    question[currentQuestion] = {
      ...question[currentQuestion],
      answer: event.target.value,
    };
    setQuestions(question);
  };

  const submitHandler = () => {
    let question = [...questions];
    fetch('/api/submission', {
      method: 'post',
      body: JSON.stringify({
        answer: JSON.stringify(
          question.reduce((prev, curr) => {
            if (curr.answer) {
              prev.push({
                id: curr.id,
                answer: curr.answer,
              });
            }
            return prev;
          }, []),
        ),
      }),
    });
    router.push('/');
  };
  if (props.timeOutStatus) {
    submitHandler();
  }

  useEffect(() => {
    const data = localStorage.getItem('data');

    if (data) {
      setQuestions(JSON.parse(data).questions);
      setCurrentQuestion(JSON.parse(data).current);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({ questions, current: currentQuestion }));
  }, [questions, currentQuestion]);

  return (
    <>
      {showAlertModal && (
        <AlertModal
          title={`ยืนยันการส่งคำตอบ`}
          content={`หากส่งคำตอบไปเเล้ว จะไม่สามารถกลับมาเเก้ไขได้`}
          onAccept={submitHandler}
          onCancel={() => {
            setShowAlertModal(false);
          }}
        />
      )}
      <div className="w-5/6 mx-auto mt-32 space-y-6 text-xl text-gray-700 md:w-3/4 lg:w-2/4">
        <div className="flex justify-between">
          {currentQuestion > 0 && (
            <button
              className="p-2 text-white bg-red-400 border rounded focus:outline-none hover:bg-red-500 active:bg-red-600"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              ข้อก่อนหน้า
            </button>
          )}
          <div className="text-black dark:text-white">
            {currentQuestion + 1} / {questions.length}
          </div>
          {currentQuestion < questions.length - 1 && (
            <button
              className="p-2 text-white bg-green-400 border rounded focus:outline-none hover:bg-green-500 active:bg-green-600"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              ข้อถัดไป
            </button>
          )}
          {currentQuestion == questions.length - 1 && (
            <button
              className="p-2 text-white bg-green-400 border rounded focus:outline-none hover:bg-green-500 active:bg-green-600"
              onClick={() => {
                setShowAlertModal(true);
              }}
            >
              ส่งคำตอบ
            </button>
          )}
        </div>
        <div className="text-center">
          <div className="flex flex-wrap justify-center">
            {questions.map((question, index) => (
              <button
                key={index}
                type="button"
                className={`flex justify-center items-center m-1 w-5 h-5 border rounded-full focus:outline-none text-xs hover:bg-blue-200 ${
                  currentQuestion == index ? 'bg-blue-700' : question.answer ? 'bg-blue-500' : 'bg-white'
                }`}
                onClick={() => setCurrentQuestion(index)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col p-4 space-y-2 bg-white border rounded-lg">
            <div className="font-bold">ข้อที่ {currentQuestion + 1}</div>
            <div className="whitespace-pre-wrap">{questions[currentQuestion].problem}</div>
          </div>
          {questions[currentQuestion].picture_url && (
            <div className="p-4 bg-white border rounded-lg">
              <img
                src={questions[currentQuestion].picture_url}
                alt={questions[currentQuestion].picture_url}
                className="mx-auto"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          {questions[currentQuestion].choice ? (
            questions[currentQuestion].choice.map((choice, index) => (
              <button
                key={index}
                className={`flex items-center p-2 border rounded-lg space-x-6 w-full focus:outline-none bg-${
                  questions[currentQuestion].answer && questions[currentQuestion].answer == choice
                    ? 'blue-500 text-white'
                    : 'white'
                }`}
                onClick={() => choiceHandler(choice)}
              >
                <div
                  className={`flex justify-center items-center w-10 h-10 border rounded-full bg-${
                    questions[currentQuestion].answer && questions[currentQuestion].answer == choice ? 'blue-400' : ''
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-left whitespace-pre-wrap">{choice}</span>
              </button>
            ))
          ) : (
            <div className="flex items-center w-full p-4 bg-white border rounded-lg">
              <textarea
                onChange={textHandler}
                className="w-full p-4 rounded-lg bg-slate-200 focus:outline-none"
                rows="7"
                placeholder="คำตอบ..."
                value={questions[currentQuestion].answer ? questions[currentQuestion].answer : ''}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
