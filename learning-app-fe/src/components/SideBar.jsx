import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfo } from "../stores/user.store";
const SideBar = () => {
  const { profile, missons } = useContext(UserInfo);
  return (
    <div className="fixed top-[7rem] z-10 hidden h-screen flex-col gap-4 font-noto text-[#777777] md:left-[62.5vw] md:flex md:w-[35vw] lg:left-[67.5vw] lg:w-[30vw] xl:left-[70vw] xl:w-[28vw]">
      <div className="h-[9rem] w-full rounded-2xl border-[2px] border-[#e5e5e5] bg-white py-6">
        <h4 className="mb-4 ml-4 font-noto text-xl font-medium text-black">
          Số ngày hoạt động
        </h4>
        <div className="flex items-center gap-3 px-4">
          <div className="mt-2 flex h-6 w-full items-center justify-center rounded-xl bg-[#58cc02]">
            <span className="text-md font-bold text-white">
              {profile?.activeDays?.length === 0
                ? "1"
                : profile?.activeDays?.length}{" "}
              ngày
            </span>
          </div>
          <img
            src="/images/logo/daygo.webp"
            className="lazyload ml-1 h-12 w-16"
          />
        </div>
      </div>
      <div className="w-full rounded-2xl border-[2px] border-[#e5e5e5] bg-white py-6">
        <div className="mx-4 flex justify-between">
          <h4 className="font-noto text-xl font-medium text-black">Nhiệm vụ</h4>
          <Link
            to="/missons"
            className="text-md flex cursor-pointer items-center font-noto text-blue-500"
          >
            Xem thêm
          </Link>
        </div>
        <ul className="text-md mt-2 flex md:max-h-[9rem] lg:max-h-[12rem] flex-col gap-3 overflow-hidden rounded-2xl">
          {missons.length !== 0 &&
            missons.map((misson, index) => (
              misson.completed === false && (
                <li key={index} className="mt-2 flex w-full px-4">
                <ul className="flex-grow items-start">
                  <li className="text-xs lg:text-md text-black">
                    {misson.missonId.misson}
                  </li>
                  <li className="relative mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                    <div
                      style={{
                        width: `${+misson.currentProgress <= +misson.missonId.numberOfRequirements ? (+misson.currentProgress / +misson.missonId.numberOfRequirements) * 100 : 100}%`
                      }}
                      className={`absolute top-[1.3px] h-[1.3rem] rounded-xl bg-[#58cc02] transition ease-linear`}
                    ></div>
                    <p className="text-md absolute left-[40%] top-0 font-bold tracking-wider text-[#ffffff]">
                      {misson.currentProgress} /{" "}
                      {misson.missonId.numberOfRequirements}
                    </p>
                  </li>
                </ul>
                <div className="ml-4 flex items-end">
                  <img
                    src="/images/logo/misson-gift.svg"
                    className="lazyload h-9 w-9"
                  />
                </div>
              </li>
              )
            ))}
        </ul>
      </div>
      <ul className="m-2 mt-0 flex flex-wrap items-center justify-center gap-3 text-sm font-bold uppercase text-[#afafaf]">
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">About</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Blog</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Store</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Efficacy</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Careers</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">INVESTORS</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Terms</Link>
        </li>
        <li className="cursor-pointer hover:text-green-500">
          <Link to="">Privacy</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
