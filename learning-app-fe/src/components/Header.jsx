import {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  memo,
} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { UserInfo } from "../stores/user.store.jsx";
import instance from "../utils/axiosRequest.js";
const Header = () => {
  const [countRequest, setCountRequest] = useState(0);
  const { profile, courseOfLearningProcess, setCourseOfLearningProcess} =
    useContext(UserInfo);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSelected(
      courseOfLearningProcess ? courseOfLearningProcess[0]?.courseId : false,
    );
  }, [courseOfLearningProcess]);
  const handleSelectCourse = async (course, id) => {
    if (countRequest === 1) return;
    setCountRequest(1);
    setSelected(course);
    await instance
      .patch(`learning_process/update_recent_access?courseId=${id}`)
      .then((res) => {
        setCourseOfLearningProcess((prevCourse) => {
          const updateCourses = [...prevCourse]
          const courseIndex = updateCourses.findIndex(course => course.courseId._id.toString() === id)
          if(courseIndex > -1){
            updateCourses.splice(courseIndex, 1)
            updateCourses.unshift({
              ...prevCourse[courseIndex]
            })
            return updateCourses
          }
        })
        navigate(`/learning?courseId=${id}`);
        setSearchParams({ courseId: id });
        setCountRequest(0);
      })
      .catch((err) => {
        setCountRequest(0);
      });
  };
  return (
    <div className="fixed left-0 right-0 top-0 z-30 w-full justify-center border-b-[1px] border-[#e5e5e5] bg-white py-3 font-noto md:left-[5.7rem] md:w-[90vw] lg:left-[17rem]">
      <ul className="flex w-full flex-wrap justify-evenly gap-2 text-end md:w-[80%] md:justify-evenly">
        <li className="flex items-center justify-center">
          <Listbox value={selected || []} onChange={setSelected}>
            <div className="relative mt-2">
              <ListboxButton className="relative w-auto cursor-default rounded-md bg-white p-1 text-left text-[12px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-[10rem]">
                <span className="flex items-center">
                  {selected ? (
                    <>
                      <img
                        alt=""
                        src={selected?.image}
                        className="lazyload h-6 w-6 shrink-0 rounded-full sm:h-7 sm:w-7"
                      />
                      <span className="ml-2 hidden sm:block">
                        {selected?.name ? "Tiếng " + selected?.name : ""}
                      </span>
                    </>
                  ) : (
                    <Link to="/courses" className="ml-1">
                      Chọn khóa học
                    </Link>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in focus:outline-none sm:text-sm"
              >
                {courseOfLearningProcess &&
                  courseOfLearningProcess.map((course, index) => (
                    <ListboxOption
                      onClick={() =>
                        handleSelectCourse(course, course.courseId._id)
                      }
                      key={index}
                      value={course?.courseId}
                      className="group relative w-[3rem] cursor-default select-none p-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white sm:w-[10rem]"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={course?.courseId?.image}
                          className="lazyload w-full shrink-0 sm:h-7 sm:w-8"
                        />
                        <span className="ml-3 hidden truncate text-[12px] font-normal group-data-[selected]:font-semibold sm:block">
                          {"Tiếng " + course?.courseId?.name}
                        </span>
                      </div>
                    </ListboxOption>
                  ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </li>
        <li className="flex items-center justify-center">
          <img
            src="/images/logo/explogo.jfif"
            className="lazyload w-5 md:w-7"
          />
          <p className="text-md ml-1 font-medium text-yellow-800 md:text-xl">
            {profile?.experiences ? profile?.experiences : 0}
          </p>
        </li>
        <li className="flex items-center justify-center">
          <img src="/images/logo/coins.png" className="lazyload w-5 md:w-7" />
          <p className="text-md ml-1 font-medium text-yellow-800 md:text-xl">
            {profile?.gems ? profile?.gems : 0}
          </p>
        </li>
        <li className="flex items-center justify-center">
          <img src="/images/logo/heart.webp" className="lazyload w-5 md:w-7" />
          <p className="text-md ml-1 font-medium text-red-600 md:text-xl">
            {profile?.hearts ? profile?.hearts : 0}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Header;
