import { useEffect, useContext, useState } from "react";
import instance from "../utils/axiosRequest.js";

import { UserInfo } from "../stores/user.store.jsx";
const ShowStatusMissons = ({
  listMisson,
  setListMisson,
  isShowInfoMisson,
  setIsShowInfoMisson,
}) => {
  const { setProfile } = useContext(UserInfo)
  const [missonCompleted, setMissonCompleted] = useState([])
  useEffect(() => {
    const checkQuestionsExist = listMisson.length !== 0 && listMisson.reduce((arr, misson) => {
      if(!arr.some(item => item.missonId.type === misson.missonId.type)){
        arr.push(misson)
      }
      return arr
    },[])
    setMissonCompleted(checkQuestionsExist)
  },[listMisson])
  useEffect(() => {
    const addAssetUser = async () => {
      const listMissonCompleted = listMisson.filter(
        (misson) => misson.completed === true && misson.missonId.type !== 'questions',
      );
      if (listMissonCompleted.length !== 0) {
        const assetUpdate = listMissonCompleted.reduce(
          (current, misson) => {
            if (misson.completed) {
              current.gems += misson.missonId.gems;
              current.experiences += misson.missonId.experiences;
              current.turns += misson.missonId.hearts;
            }
            return current;
          },
          { gems: 0, experiences: 0, turns: 0 },
        )
        await instance.patch('users/update_asset', assetUpdate)
        .then(() => {
          setProfile((prev) => {
            const updateProfile = {...prev};
            updateProfile.experiences =
              +updateProfile.experiences + +assetUpdate.experiences;
            updateProfile.gems =
              +updateProfile.gems + +assetUpdate.gems;
            updateProfile.hearts =
              +updateProfile.hearts + +assetUpdate.turns;
            return updateProfile;
          })
        })
        .catch(err => err)
      }
      return;
    }
    addAssetUser()
  }, [listMisson]);
  return (
    isShowInfoMisson &&
    listMisson.length !== 0 ? (
      <div className="fixed z-30 mx-auto my-auto flex h-screen w-full items-center justify-center bg-[#e8e8e8]">
        <div className="w-[95%]">
          <div className="flex w-full items-center justify-center">
            <div className="ml-2 w-[90%] rounded-xl bg-white p-4 font-noto md:w-[70%]">
              <p className="md:text-md text-center text-xs font-semibold uppercase lg:text-lg">
                Tiến trình hiện tại của các nhiệm vụ
              </p>
              {/* Danh sách nhiệm vụ */}
              <ul className="mt-4 max-h-[70vh] space-y-3 overflow-scroll scrollbar-none">
                {missonCompleted && missonCompleted.map((misson, index) => (
                  <li
                    key={index}
                    className={`w-full ${misson.completed ? "bg-[#ebf9e4] text-black" : ""} rounded-xl border-[1px] border-[#e5e5e5] p-4`}
                  >
                    <div className="flex">
                      <ul className="flex-grow items-start">
                        <li className="pl-2 tracking-wider">
                          {misson.missonId.misson}
                        </li>
                        <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                          <div
                            style={{
                              width: `${+misson.currentProgress <= +misson.missonId.numberOfRequirements ? (+misson.currentProgress / +misson.missonId.numberOfRequirements) * 100 : 100}%`,
                            }}
                            className={`absolute top-[1.3px] h-[1.3rem] rounded-xl bg-[#58cc02] transition-all duration-500 ease-linear`}
                          ></div>
                          <p className="absolute left-[40%] top-0 font-noto font-semibold text-white">
                            {misson.currentProgress} /{" "}
                            {misson.missonId.numberOfRequirements}
                          </p>
                        </li>
                      </ul>
                      <div className="relative ml-4 flex items-end justify-center">
                        <img
                          src="/images/logo/misson-gift.svg"
                          className="lazyload h-9 w-9"
                        />
                        {misson.completed && (
                          <i className="fa-solid fa-check absolute right-[-0.7rem] top-[0.5rem] hidden text-[3.5rem] font-bold text-[#774e2f] md:flex"></i>
                        )}
                      </div>
                    </div>
                    {misson.completed && (
                      <>
                        <p className="mt-3 text-center font-noto text-black">
                          Bạn đã nhận được:{" "}
                        </p>
                        <ul className="mx-auto flex w-[90%] justify-around text-left text-xl font-bold sm:w-[60%]">
                          <li className="flex items-center">
                            {misson.missonId.gems}
                            <img
                              src="/images/logo/coins.png"
                              className="lazyload ml-1 h-4"
                            />
                          </li>
                          <li className="flex items-center">
                            {misson.missonId.experiences}
                            <img
                              src="/images/logo/explogo.jfif"
                              className="lazyload ml-1 h-4"
                            />
                          </li>
                          <li className="flex items-center">
                            <span>{misson.missonId.hearts}</span>
                            <img
                              src="/images/logo/heart.webp"
                              className="lazyload ml-1 h-4"
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <div
                onClick={() => {setIsShowInfoMisson(false), setListMisson([])}}
                className="mx-auto mb-4 mt-5 w-[9rem] cursor-pointer rounded-lg border-2 border-[#b7dceb] bg-[#d3e9f8] text-center shadow-xl hover:border-[#dfe1e2] hover:text-white"
              >
                Đóng
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : ''
  );
};

export default ShowStatusMissons;
