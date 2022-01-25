// >> Element เก่า
// <div
// 	className={`${animation.fade} flex flex-col justify-center items-center absolute z-20 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black`}
// >
// 	<div
// 		className='absolute top-0 bottom-0 left-0 right-0 z-20 w-screen h-screen'
// 		onClick={() => setShowModal(false)}
// 	></div>
// 	<div className={`${animation.zoom} z-30`}>
// 		<div className='bg-white rounded-lg'>{children}</div>
// 	</div>
// </div>

const AlertModal = ({ title, content, onAccept, onCancel }) => {
  return (
    <div className="fixed inset-0 z-20 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gray-500"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">{content}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                onClick={onAccept}
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white bg-red-600 border border-transparent rounded-md hover:bg-red-500 active:bg-red-700 focus:outline-none sm:text-sm sm:leading-5"
              >
                ตกลง
              </button>
            </span>
            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={onCancel}
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none sm:text-sm sm:leading-5"
              >
                ยกเลิก
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
