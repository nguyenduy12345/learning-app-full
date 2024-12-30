import { useContext, useEffect } from "react";
import { gsap } from "gsap";

import { UserInfo } from "../stores/user.store.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import SideBar from "../components/SideBar.jsx";
import Loading from "../components/Loading.jsx";

const Misson = () => {
  const { profile, missons } = useContext(UserInfo);
  const fullName = profile?.fullName
    ? `Chào ${profile.fullName} !`
    : "Chào bạn";
  useEffect(() => {
    gsap.fromTo(
      [".name", ".letter"],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      },
    );
  }, []);
  const text =
    "Hoàn thành các nhiệm vụ để nhận rương kho báu. Đảm bảo sẽ có nhiều phần quà hấp dẫn dành cho bạn mỗi ngày!";
  return (
    <MainLayout>
      <Loading />
      <div className="relative">
        <div className="absolute mx-auto mt-[6rem] pb-[5rem] flex w-[95%] flex-col gap-[1.5rem] bg-white font-noto md:left-[5.5rem] md:w-[51vw] lg:left-[17rem] lg:w-[42vw] lg:flex-grow lg:flex-row xl:w-[50vw] 2xl:w-[52vw]">
          <div className="w-full bg-white">
            <div
              className={`mx-auto flex w-[96%] flex-col rounded-2xl bg-[#ddf4ff] p-8 pb-0`}
            >
              <h4 className="text-xl font-bold md:text-2xl">
                {fullName.split(" ").map((char, index) => (
                  <span key={index} className="name">
                    {char + " "}
                  </span>
                ))}
              </h4>
              <p className="mt-3">
                {text.split(" ").map((char, index) => (
                  <span key={index} className="letter">
                    {char + " "}
                  </span>
                ))}
              </p>
              <div className="flex w-full items-end justify-end">
                <img src="/images/cat_congru2.png" className="lazyload w-28" />
              </div>
            </div>
            <div className="mx-auto mt-6 w-[95%]">
              <h4 className="text-2xl font-bold">Nhiệm vụ</h4>
              <ul className="mt-4 flex flex-col gap-4">
                {missons.length !== 0 &&
                  missons.map((misson, index) => (
                    <li
                      key={index}
                      className={`flex h-[7rem] w-full ${misson.completed ? "bg-[#87ed50] text-white" : ""} rounded-xl border-[1px] border-[#e5e5e5] p-4`}
                    >
                      <ul className="flex-grow items-start">
                        <li className="text-sm md:text-md pl-2 md:tracking-wider">
                          {misson.missonId.misson}
                        </li>
                        
                        <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                          <div
                            style={{
                              width: `${+misson.currentProgress <= +misson.missonId.numberOfRequirements ? (+misson.currentProgress / +misson.missonId.numberOfRequirements) * 100 : 100}%`,
                            }}
                            className={`absolute top-[1.3px] h-[1.3rem] rounded-xl bg-[#58cc02] transition ease-linear`}
                          ></div>
                          <p className="absolute left-[40%] top-0 font-noto font-semibold text-white">
                            {misson.currentProgress} /{" "}
                            {misson.missonId.numberOfRequirements}
                          </p>
                        </li>
                      </ul>
                      <div className="relative ml-4 flex items-center justify-center">
                        <img
                          src="/images/logo/misson-gift.svg"
                          className="lazyload h-9 w-9"
                        />
                        {misson.completed && (
                          <p className="hidden md:flex absolute right-[-6px] top-[0.9rem] h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
                            <i className="fa-solid fa-check text-[3.5rem] font-bold text-white"></i>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </MainLayout>
  );
};

export default Misson;
