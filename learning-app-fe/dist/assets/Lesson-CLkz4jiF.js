import{r as l,U as J,j as e,i as v,b as ue}from"./index-DOHiL2hy.js";const fe=({question:t,lessonId:L,handleNextQuestion:Q,setQuestionsCorrect:O})=>{const{setProfile:m,lessonsOfSummaryLesson:j,setLessonOfSummaryLesson:B}=l.useContext(J),[d,S]=l.useState(),[r,f]=l.useState(),[c,R]=l.useState([]),[z,_]=l.useState(0),[k,g]=l.useState("");l.useEffect(()=>{const x=t==null?void 0:t.answers.map(w=>({answer:w,selected:!1}));R(x)},[t]);const F=x=>{switch(x){case 0:return"A.";case 1:return"B.";case 2:return"C.";default:return"D."}},i=x=>{c.map(w=>w.selected=!1),c[x].selected=!0,R([...c]),f(x+1)},A=()=>{const x=t==null?void 0:t.answers.map(w=>({answer:w,selected:!1}));R(x),S(void 0),f(void 0),_(0)},p=async()=>{if(z!==1){if(_(1),!r){g("Bạn chưa chọn đáp án!"),setTimeout(()=>g(""),1500),_(0);return}try{if((await v.post(`questions/${t._id}`,{answer:r-1})).data.data.correct){_(0),O(w=>w+1),S(!0);return}else{O(0),S(!1),await v.patch("users/update_asset",{hearts:Math.random()}),m(W=>({...W,hearts:W.hearts-1}));const w=j.findIndex(W=>W.lesson._id.toString()===L);if(w>-1){if(j[w].wrongQuestions.findIndex(H=>H.toString()===t._id.toString())>-1){_(0);return}await v.patch("summary_lesson/update_lesson",{lessonId:L,questionId:t._id}),j[w].wrongQuestions.push(t._id.toString()),B([...j]),_(0);return}return}}catch{_(0)}}},I=()=>{d&&(Q(),S(void 0),f(void 0),_(0))};return e.jsx(e.Fragment,{children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mx-auto mb-2 mt-3 h-full w-full px-5 md:mt-7 md:w-[65%] md:px-0",children:[e.jsx("p",{className:"mb-2 text-center font-noto font-bold md:text-2xl",children:"Chọn đáp án đúng"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex",children:[e.jsx("img",{src:"/images/meo_image_learning.png",alt:"",className:"lazyload mr-2 h-10 w-10 md:mr-5 md:h-24 md:w-24"}),e.jsx("p",{className:"flex items-end font-noto md:text-xl",children:t==null?void 0:t.question})]}),e.jsx("div",{className:"mt-2 flex w-full items-center justify-center",children:e.jsx("ul",{className:"mt-4 grid w-[80%] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:w-full",children:c&&c.map((x,w)=>e.jsxs("li",{onClick:()=>i(w),className:`border-1 cursor-pointer rounded-lg py-4 pl-2 pr-8 font-medium ${x.selected?"bg-[#d7ffb8]":"bg-[#eeeeee]"} px-2 hover:bg-[#d7ffb8] md:text-xl`,children:[e.jsx("span",{className:"pl-3 font-noto font-medium",children:F(w)}),e.jsx("span",{className:"font-noto",children:x.answer})]},w))})})]})]}),e.jsxs("div",{className:`fixed bottom-0 h-[10rem] w-full lg:h-[13rem] ${d===!0?"bg-[#d7ffb8]":d===!1?"bg-[#ffdfe0]":"bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`,children:[e.jsxs("div",{className:"relative mx-auto flex w-full justify-between md:w-[65%]",children:[e.jsx("div",{className:"cursor-pointer",children:d===!0||d===!1?"":e.jsx("button",{onClick:A,className:"borer-[#e5e5e5] flex transform items-center justify-center rounded-xl border-[3px] border-b-[5px] bg-white px-6 py-2 font-noto font-medium text-[#afafaf] transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold",children:"Làm lại"})}),e.jsx("div",{className:"cursor-pointer",children:d===!0?e.jsx("button",{onClick:I,className:"flex transform cursor-pointer items-center justify-center rounded-lg bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Câu tiếp theo"}):d===!1?e.jsx("button",{onClick:A,className:"borer-[#e5e5e5] flex transform cursor-pointer items-center justify-center rounded-xl border-[1px] border-b-[5px] bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Làm lại"}):e.jsx("button",{onClick:p,className:`flex transform cursor-pointer items-center justify-center rounded-lg ${r?"bg-[#58cc02] text-white":"bg-[#e5e5e5] text-[#afafaf]"} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`,children:"Kiểm tra đáp án"})}),d===!0?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-green-600 md:left-2 md:text-6xl",children:[e.jsx("p",{className:"max-w-fit",children:"Good!"}),e.jsx("p",{className:"text-xl",children:"Cùng tới với câu tiếp theo nào!"})]}):d===!1?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-red-600 md:left-2 md:text-6xl",children:[e.jsx("p",{className:"max-w-fit",children:"Sai!"}),e.jsx("p",{className:"text-xl",children:"Bạn làm sai rồi, làm lại nhé!"})]}):""]}),e.jsx("p",{className:"mt-3 w-full text-center font-noto text-lg font-semibold text-red-500 md:text-xl",children:k})]})]})})},he=({question:t,lessonId:L,handleNextQuestion:Q,setQuestionsCorrect:O})=>{var M;const{setProfile:m,lessonsOfSummaryLesson:j,setLessonOfSummaryLesson:B}=l.useContext(J),[d,S]=l.useState([]),[r,f]=l.useState([]),[c,R]=l.useState(),[z,_]=l.useState(""),[k,g]=l.useState(0),[F,i]=l.useState([]),[A,p]=l.useState([]),[I,x]=l.useState(0);l.useEffect(()=>{const s=[];for(let o=0;o<=F.length/2+2;o+=2)s.push({left:F[o],right:F[o+1]});p(s)},[F]);function w(s){for(let o=s.length-1;o>0;o--){const y=Math.floor(Math.random()*(o+1));[s[o],s[y]]=[s[y],s[o]]}return s}l.useEffect(()=>{var y,T;const s=(y=t==null?void 0:t.rightOptions)==null?void 0:y.map(U=>({right:U,selected:!1})),o=(T=t==null?void 0:t.leftOptions)==null?void 0:T.map(U=>({left:U,selected:!1}));f(w(s)),S(o)},[t]);const W=(s,o)=>{d[o].selected!==!0&&I===0&&(x(1),d[o].selected=!0,S([...d]),i([...F,s]))},H=(s,o)=>{r[o].selected!==!0&&I===1&&(x(0),r[o].selected=!0,f([...r]),i([...F,s]))},G=async()=>{if(k!==1){if(g(1),A.length!==(t==null?void 0:t.leftOptions.length)){g(0),_("Hãy nối tất cả các từ đã cho bên dưới"),setTimeout(()=>_(""),1500);return}try{if((await v.post(`questions/${t._id}`,{answer:A})).data.data.correct){R(!0),O(o=>o+1),g(0);return}else{R(!1),O(0),await v.patch("users/update_asset",{hearts:Math.random()}),m(y=>({...y,hearts:y.hearts-1}));const o=j.findIndex(y=>y.lesson._id.toString()===L);if(o>-1){if(j[o].wrongQuestions.findIndex(T=>T.toString()===t._id.toString())>-1){g(0);return}await v.patch("summary_lesson/update_lesson",{lessonId:L,questionId:t._id}),j[o].wrongQuestions.push(t._id.toString()),B([...j]),g(0);return}return}}catch{g(0)}}},K=()=>{const s=t==null?void 0:t.rightOptions.map(y=>({right:y,selected:!1})),o=t==null?void 0:t.leftOptions.map(y=>({left:y,selected:!1}));x(0),f(w(s)),S(o),i([]),p([]),g(0),R(void 0)},Y=()=>{if(c){g(0),Q(),i([]),p([]),R(void 0);return}};return e.jsx(e.Fragment,{children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mx-auto mt-[2rem] w-full px-5 md:w-[65%] md:px-0",children:[e.jsx("p",{className:"text-md text-center font-noto font-bold lg:text-lg",children:"Nối các từ từ bên cột trái với các từ tại cột phải sao cho đúng"}),e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx("ul",{className:"mt-4 grid w-[44%] grid-cols-1 gap-2 md:mt-6 md:w-[33%]",children:d&&(d==null?void 0:d.map((s,o)=>e.jsxs("li",{onClick:()=>W(s==null?void 0:s.left,o),className:"border-1 text-md relative flex h-[2.5rem] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] p-1 font-noto hover:bg-green-200 active:scale-95 md:text-lg lg:h-[3rem]",children:[e.jsx("div",{className:"absolute left-[0.5rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full border-[2px] border-[#e5e5e5] text-[#afafaf] sm:left-[1rem]",children:o+1}),s!=null&&s.selected?"":s==null?void 0:s.left]},o)))}),e.jsx("ul",{className:"mt-4 grid w-[44%] grid-cols-1 gap-2 md:mt-6 md:w-[33%]",children:r&&(r==null?void 0:r.map((s,o)=>e.jsxs("li",{onClick:()=>H(s==null?void 0:s.right,o),className:"border-1 text-md relative flex h-[2.5rem] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] p-1 font-noto hover:bg-green-200 active:scale-95 md:text-lg lg:h-[3rem]",children:[e.jsx("div",{className:"absolute left-[0.5rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full border-[2px] border-[#e5e5e5] text-[#afafaf] sm:left-[1rem]",children:o+1}),s!=null&&s.selected?"":s==null?void 0:s.right]},o)))})]}),e.jsxs("h4",{className:"md:xl text-md md:text-md mb-2 mt-5 font-noto font-medium lg:mb-5 xl:text-lg",children:["Các từ đã nối:"," "]}),e.jsx("ul",{className:"flex flex-wrap justify-evenly gap-2",children:A&&A.map((s,o)=>e.jsxs("li",{className:"text-md flex rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] bg-white px-4 font-noto lg:px-6 lg:py-1",children:[e.jsx("p",{children:`${s.left?s.left+"__":""}`}),e.jsxs("p",{children:[" ",s.right?s.right:""]})]},o))})]}),e.jsxs("div",{className:`fixed bottom-0 h-[10rem] w-full ${c===!0?"bg-[#d7ffb8]":c===!1?"bg-[#ffdfe0]":"bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`,children:[e.jsxs("div",{className:"relative mx-auto flex w-full justify-between md:w-[65%]",children:[e.jsx("div",{className:"cursor-pointer",children:c===!0||c===!1?"":e.jsx("button",{onClick:K,className:"borer-[#e5e5e5] flex transform items-center justify-center rounded-xl border-[3px] border-b-[5px] bg-white px-6 py-2 font-noto font-medium text-[#afafaf] transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold",children:"Làm lại"})}),e.jsx("div",{className:"cursor-pointer",children:c===!0?e.jsx("button",{onClick:Y,className:"flex transform cursor-pointer items-center justify-center rounded-lg bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Câu tiếp theo"}):c===!1?e.jsx("button",{onClick:K,className:"borer-[#e5e5e5] flex transform cursor-pointer items-center justify-center rounded-xl border-[1px] border-b-[5px] bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Làm lại"}):e.jsx("button",{onClick:G,className:`flex transform cursor-pointer items-center justify-center rounded-lg ${A.length===((M=t==null?void 0:t.leftOptions)==null?void 0:M.length)?"bg-[#58cc02] text-white":"bg-[#e5e5e5] text-[#afafaf]"} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`,children:"Kiểm tra đáp án"})}),c===!0?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-green-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Good!"}),e.jsx("p",{className:"text-xl",children:"Cùng tới với câu tiếp theo nào!"})]}):c===!1?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-red-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Sai!"}),e.jsx("p",{className:"text-xl",children:"Bạn làm sai rồi, làm lại nhé!"})]}):""]}),e.jsx("p",{className:"mt-3 w-full text-center font-noto text-lg font-semibold text-red-500 md:text-xl",children:z})]})]})})},pe=({question:t,lessonId:L,handleNextQuestion:Q,setQuestionsCorrect:O})=>{const{setProfile:m,lessonsOfSummaryLesson:j,setLessonOfSummaryLesson:B}=l.useContext(J),[d,S]=l.useState((t==null?void 0:t.document)||""),[r,f]=l.useState((t==null?void 0:t.words)||[]),[c,R]=l.useState(!1),[z,_]=l.useState([]),[k,g]=l.useState(void 0),[F,i]=l.useState(""),[A,p]=l.useState(0),I=l.useRef(),x=M=>{M.preventDefault()},w=(M,s)=>{s.target.innerHTML=r[c];const o=[...r];o.splice(c,1),f(o),R(!1);const y=z.findIndex(T=>+T.index==+M);if(y>-1){const T=[...r];T.splice(c,1),T.splice(c,0,z[y].word),f(T),z[y].word=r[c],_([...z])}else _([...z,{index:M,word:r[c]}])},W=(M,s)=>{R(s)},H=M=>{const s=M.split("__________");return s.map((o,y)=>y<s.length-1?e.jsxs(e.Fragment,{children:[o,e.jsx("div",{onDragOver:x,onDrop:T=>w(y,T),style:{userSelect:"none"},className:"m-1 inline-block h-6 w-24 rounded-sm bg-gray-300 text-center normal-case md:h-7 md:w-28"},y)]}):o)},G=async()=>{if(A!==1){if(p(1),z.length!==+(t==null?void 0:t.countCorrect)){p(0),i("Hãy điền đủ vị trí trống trong đoạn văn!"),setTimeout(()=>i(""),1500);return}try{if((await v.post(`questions/${t._id}`,{answer:z})).data.data.correct){O(s=>s+1),g(!0),p(0);return}else{O(0),g(!1),await v.patch("users/update_asset",{hearts:Math.random()}),m(o=>({...o,hearts:o.hearts-1}));const s=j.findIndex(o=>o.lesson._id.toString()===L);if(s>-1){if(j[s].wrongQuestions.findIndex(y=>y.toString()===t._id.toString())>-1){p(0);return}await v.patch("summary_lesson/update_lesson",{lessonId:L,questionId:t._id}),j[s].wrongQuestions.push(t._id.toString()),B([...j]),p(0);return}return}}catch{p(0)}}},K=()=>{if(p(0),f(t==null?void 0:t.words),_([]),g(void 0),R(!1),I.current){const M=I.current.children;for(let s of M)s.innerHTML="&nbsp;"}};l.useEffect(()=>{if(S(t==null?void 0:t.document),f(t==null?void 0:t.words),_([]),g(void 0),R(!1),I.current){const M=I.current.children;for(let s of M)s.innerHTML="&nbsp;"}},[t]);const Y=()=>{if(k){Q(),g(void 0),p(0);return}};return e.jsx(e.Fragment,{children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mx-auto mt-3 w-full px-5 md:mb-8 md:mt-7 md:w-[75%] md:px-0",children:[e.jsx("p",{className:"text-md text-center font-noto font-medium md:mb-4 lg:text-lg",children:"Di chuyển các từ bên dưới để ghép vào chỗ trống của đoạn văn bên dưới sao cho đúng:"}),e.jsxs("div",{className:"mt-2 md:mt-6",children:[e.jsxs("div",{className:"flex",children:[e.jsx("img",{src:"/images/meo_image_learning.png",alt:"",className:"lazyload mr-2 h-10 w-10 md:mr-5 md:h-24 md:w-24"}),e.jsx("div",{ref:I,className:"text-md inline-block w-full items-end font-noto lg:text-lg",children:H(d)})]}),e.jsx("div",{className:"mt-4 flex w-full items-center justify-center lg:mt-6",children:e.jsx("ul",{className:"flex w-full flex-wrap justify-evenly gap-1 md:gap-4 lg:mt-4 lg:w-5/6",children:r.map((M,s)=>e.jsx("li",{draggable:"true",onDragStart:()=>W(M,s),className:"border-1 cursor-pointer rounded-lg bg-[#eeeeee] px-6 py-1 text-sm lowercase hover:bg-green-400 md:px-8 lg:text-lg",children:M},s))})})]})]}),e.jsxs("div",{className:`fixed bottom-0 h-52 w-full ${k===!0?"bg-[#d7ffb8]":k===!1?"bg-[#ffdfe0]":"bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`,children:[e.jsxs("div",{className:"relative mx-auto flex w-full justify-between md:w-[65%]",children:[e.jsx("div",{className:"cursor-pointer",children:k===!0||k===!1?"":e.jsx("button",{onClick:K,className:"flex transform items-center justify-center rounded-xl border-[3px] border-b-[5px] border-[#e5e5e5] bg-white px-6 py-2 font-noto font-medium text-[#afafaf] transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold",children:"Làm lại"})}),e.jsx("div",{className:"cursor-pointer",children:k===!0?e.jsx("button",{onClick:Y,className:"flex transform cursor-pointer items-center justify-center rounded-lg bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Câu tiếp theo"}):k===!1?e.jsx("button",{onClick:K,className:"borer-[#e5e5e5] flex transform cursor-pointer items-center justify-center rounded-xl border-[1px] border-b-[5px] bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Làm lại"}):e.jsx("button",{onClick:G,className:`flex transform cursor-pointer items-center justify-center rounded-lg ${z.length===+(t==null?void 0:t.countCorrect)?"bg-[#58cc02] text-white":"bg-[#e5e5e5] text-[#afafaf]"} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`,children:"Kiểm tra đáp án"})}),k===!0?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-green-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Good!"}),e.jsx("p",{className:"text-xl",children:"Cùng tới với câu tiếp theo nào!"})]}):k===!1?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-red-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Sai!"}),e.jsx("p",{className:"text-xl",children:"Bạn làm sai rồi, làm lại nhé!"})]}):""]}),e.jsx("p",{className:"mt-3 w-full text-center font-noto text-lg font-semibold text-red-500 md:text-xl",children:F})]})]})})},ge=({question:t,lessonId:L,handleNextQuestion:Q,setQuestionsCorrect:O})=>{const{setProfile:m,lessonsOfSummaryLesson:j,setLessonOfSummaryLesson:B}=l.useContext(J),[d,S]=l.useState(),[r,f]=l.useState([]),[c,R]=l.useState([]),[z,_]=l.useState(0),[k,g]=l.useState("");l.useEffect(()=>{var x;const I=(x=t==null?void 0:t.words)==null?void 0:x.map(w=>({word:w,selected:!1}));R(I)},[t]);const F=(I,x)=>{I.selected||(c[x].selected=!0,R([...c]),f([...r,I.word]))},i=()=>{const I=t==null?void 0:t.words.map(x=>({word:x,selected:!1}));R(I),S(void 0),f([]),_(0)},A=async()=>{if(z===1)return;if(_(1),r.length===0){g("Hãy chọn từ để sắp xếp"),setTimeout(()=>g(""),1500),_(0);return}const I=r.join(" ");try{if((await v.post(`questions/${t._id}`,{answer:I})).data.data.correct){_(0),O(w=>w+1),S(!0);return}else{O(0),S(!1),await v.patch("users/update_asset",{hearts:Math.random()}),m(W=>({...W,hearts:W.hearts-1}));const w=j.findIndex(W=>W.lesson._id.toString()===L);if(w>-1){if(j[w].wrongQuestions.findIndex(H=>H.toString()===t._id.toString())>-1){_(0);return}await v.patch("summary_lesson/update_lesson",{lessonId:L,questionId:t._id}),j[w].wrongQuestions.push(t._id.toString()),B([...j]),_(0);return}return}}catch{_(0)}},p=()=>{d&&(Q(),S(void 0),f([]),_(0))};return e.jsx(e.Fragment,{children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mx-auto mb-2 mt-3 h-full w-full px-5 md:mt-7 md:w-[65%] md:px-0",children:[e.jsx("p",{className:"text-center font-noto font-bold md:text-xl",children:"Sắp xếp các từ bên dưới thành câu đúng nghĩa với câu đã cho:"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex",children:[e.jsx("img",{src:"/images/logo/speaker.png",alt:"",className:"lazyload mr-2 h-10 w-10 md:mr-2 md:h-16 md:w-16"}),e.jsxs("p",{className:"flex items-end font-noto md:text-xl",children:[': " ',t==null?void 0:t.document,' "']})]}),e.jsx("div",{className:"mt-3 flex h-[6rem] w-full items-center justify-center gap-1 rounded-xl border-2 border-[#e5e5e5] px-4",children:e.jsx("div",{className:"text-md flex h-auto flex-wrap gap-2 border-b-[1px] border-[#9f8c8c] px-4 lg:text-lg",children:r&&(r==null?void 0:r.map((I,x)=>e.jsx("p",{children:I},x)))})}),e.jsx("div",{className:"mt-4 flex w-full items-center justify-center",children:e.jsx("ul",{className:"flex w-full flex-wrap justify-evenly gap-1 md:gap-2 lg:w-5/6",children:c==null?void 0:c.map((I,x)=>e.jsx("li",{onClick:()=>F(I,x),className:"border-1 text-md h-[2.5rem] cursor-pointer rounded-lg border-[2px] border-[#e5e5e5] px-6 py-1 lowercase hover:bg-green-400 lg:px-8 lg:text-lg",children:I.selected===!1&&I.word?I.word:" "},x))})})]})]}),e.jsxs("div",{className:`fixed bottom-0 h-[10rem] w-full ${d===!0?"bg-[#d7ffb8]":d===!1?"bg-[#ffdfe0]":"bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`,children:[e.jsxs("div",{className:"relative mx-auto flex w-full justify-between md:w-[65%]",children:[e.jsx("div",{className:"cursor-pointer",children:d===!0||d===!1?"":e.jsx("button",{onClick:i,className:"borer-[#e5e5e5] flex transform items-center justify-center rounded-xl border-[3px] border-b-[5px] bg-white px-6 py-2 font-noto font-medium text-[#afafaf] transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold",children:"Làm lại"})}),e.jsx("div",{className:"cursor-pointer",children:d===!0?e.jsx("button",{onClick:p,className:"flex transform cursor-pointer items-center justify-center rounded-lg bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Câu tiếp theo"}):d===!1?e.jsx("button",{onClick:i,className:"borer-[#e5e5e5] flex transform cursor-pointer items-center justify-center rounded-xl border-[1px] border-b-[5px] bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold",children:"Làm lại"}):e.jsx("button",{onClick:A,className:`flex transform cursor-pointer items-center justify-center rounded-lg ${r.length>0?"bg-[#58cc02] text-white":"bg-[#e5e5e5] text-[#afafaf]"} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`,children:"Kiểm tra đáp án"})}),d===!0?e.jsxs("div",{className:"absolute left-2 top-[2.1rem] text-4xl font-bold text-green-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Good!"}),e.jsx("p",{className:"text-sm md:text-xl",children:"Cùng tới với câu tiếp theo nào!"})]}):d===!1?e.jsxs("div",{className:"top-[2.1rem]text-4xl absolute left-2 font-bold text-red-600 md:left-2 md:text-6xl",children:[e.jsx("p",{children:"Sai!"}),e.jsx("p",{className:"text-sm md:text-xl",children:"Bạn làm sai rồi, làm lại nhé!"})]}):""]}),e.jsx("p",{className:"mt-3 w-full text-center font-noto text-lg font-semibold text-red-500 md:text-xl",children:k})]})]})})},be=({setIsCongratulation:t,currentLesson:L,lessons:Q,setIsLesson:O})=>{const m=()=>{t(!1),O(!1)};return e.jsx("div",{className:"fixed z-30 mx-auto my-auto flex h-screen w-full items-center justify-center bg-[#e8e8e8]",children:e.jsxs("div",{className:"w-[95%] sm:w-[70%]",children:[e.jsx("div",{className:"flex w-full items-center justify-center",children:e.jsxs("div",{style:{clipPath:"polygon(0% 0%, 100% 0%, 100% 96%, 64% 96%, 51% 100%, 36% 96%, 0 95%)"},className:"ml-2 w-[70%] rounded-xl bg-white p-4 font-noto",children:[e.jsxs("ul",{className:"flex justify-center items-center text-center text-2xl font-bold",children:[e.jsx("li",{children:e.jsx("img",{src:"/images/congru.png",className:"w-12 h-12 lazyload"})}),e.jsx("li",{className:"ml-2",children:"CHÚC MỪNG"})]}),e.jsx("p",{className:"text-center",children:"Bạn vừa hoàn thành một bài học"}),e.jsx("p",{className:"text-center font-noto",children:"Bạn đã nhận được: "}),e.jsxs("ul",{className:"mx-auto mt-3 mb-3 flex w-[90%] sm:w-[60%] justify-around text-left text-xl font-bold",children:[e.jsxs("li",{className:"flex items-center",children:[Q[L-1].gems,e.jsx("img",{src:"/images/logo/coins.png",className:"ml-1 h-4 lazyload"})]}),e.jsxs("li",{className:"flex items-center",children:[Q[L-1].experiences,e.jsx("img",{src:"/images/logo/explogo.jfif",className:"ml-1 h-4 lazyload"})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx("span",{children:"5"}),e.jsx("img",{src:"/images/logo/heart.webp",className:"ml-1 h-4 lazyload"})]})]}),e.jsx("div",{onClick:()=>m(),className:"w-[9rem] text-center mx-auto mb-4 mt-5 cursor-pointer border-2 border-[#b7dceb] rounded-lg bg-[#d3e9f8] hover:text-white hover:border-[#dfe1e2] shadow-xl",children:"Tiếp tục"})]})}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("img",{src:"/images/cat_congru1.png",className:"h-[10rem] w-[10rem] lazyload"})})]})})},je=({listMisson:t,setListMisson:L,isShowInfoMisson:Q,setIsShowInfoMisson:O})=>{const{setProfile:m}=l.useContext(J),[j,B]=l.useState([]);return l.useEffect(()=>{const d=t.length!==0&&t.reduce((S,r)=>(S.some(f=>f.missonId.type===r.missonId.type)||S.push(r),S),[]);B(d)},[t]),l.useEffect(()=>{(async()=>{const S=t.filter(r=>r.completed===!0&&r.missonId.type!=="questions");if(S.length!==0){const r=S.reduce((f,c)=>(c.completed&&(f.gems+=c.missonId.gems,f.experiences+=c.missonId.experiences,f.turns+=c.missonId.hearts),f),{gems:0,experiences:0,turns:0});await v.patch("users/update_asset",r).then(()=>{m(f=>{const c={...f};return c.experiences=+c.experiences+ +r.experiences,c.gems=+c.gems+ +r.gems,c.hearts=+c.hearts+ +r.turns,c})}).catch(f=>f)}})()},[t]),Q&&t.length!==0?e.jsx("div",{className:"fixed z-30 mx-auto my-auto flex h-screen w-full items-center justify-center bg-[#e8e8e8]",children:e.jsx("div",{className:"w-[95%]",children:e.jsx("div",{className:"flex w-full items-center justify-center",children:e.jsxs("div",{className:"ml-2 w-[90%] rounded-xl bg-white p-4 font-noto md:w-[70%]",children:[e.jsx("p",{className:"md:text-md text-center text-xs font-semibold uppercase lg:text-lg",children:"Tiến trình hiện tại của các nhiệm vụ"}),e.jsx("ul",{className:"mt-4 max-h-[70vh] space-y-3 overflow-scroll scrollbar-none",children:j&&j.map((d,S)=>e.jsxs("li",{className:`w-full ${d.completed?"bg-[#ebf9e4] text-black":""} rounded-xl border-[1px] border-[#e5e5e5] p-4`,children:[e.jsxs("div",{className:"flex",children:[e.jsxs("ul",{className:"flex-grow items-start",children:[e.jsx("li",{className:"pl-2 tracking-wider",children:d.missonId.misson}),e.jsxs("li",{className:"relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]",children:[e.jsx("div",{style:{width:`${+d.currentProgress<=+d.missonId.numberOfRequirements?+d.currentProgress/+d.missonId.numberOfRequirements*100:100}%`},className:"absolute top-[1.3px] h-[1.3rem] rounded-xl bg-[#58cc02] transition-all duration-500 ease-linear"}),e.jsxs("p",{className:"absolute left-[40%] top-0 font-noto font-semibold text-white",children:[d.currentProgress," /"," ",d.missonId.numberOfRequirements]})]})]}),e.jsxs("div",{className:"relative ml-4 flex items-end justify-center",children:[e.jsx("img",{src:"/images/logo/misson-gift.svg",className:"lazyload h-9 w-9"}),d.completed&&e.jsx("i",{className:"fa-solid fa-check absolute right-[-0.7rem] top-[0.5rem] hidden text-[3.5rem] font-bold text-[#774e2f] md:flex"})]})]}),d.completed&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"mt-3 text-center font-noto text-black",children:["Bạn đã nhận được:"," "]}),e.jsxs("ul",{className:"mx-auto flex w-[90%] justify-around text-left text-xl font-bold sm:w-[60%]",children:[e.jsxs("li",{className:"flex items-center",children:[d.missonId.gems,e.jsx("img",{src:"/images/logo/coins.png",className:"lazyload ml-1 h-4"})]}),e.jsxs("li",{className:"flex items-center",children:[d.missonId.experiences,e.jsx("img",{src:"/images/logo/explogo.jfif",className:"lazyload ml-1 h-4"})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx("span",{children:d.missonId.hearts}),e.jsx("img",{src:"/images/logo/heart.webp",className:"lazyload ml-1 h-4"})]})]})]})]},S))}),e.jsx("div",{onClick:()=>{O(!1),L([])},className:"mx-auto mb-4 mt-5 w-[9rem] cursor-pointer rounded-lg border-2 border-[#b7dceb] bg-[#d3e9f8] text-center shadow-xl hover:border-[#dfe1e2] hover:text-white",children:"Đóng"})]})})})}):""},me=()=>{const t=new Date(Date.now()),L=t.getFullYear(),Q=t.getMonth(),O=t.getDate();return`${L}-${Q+1}-${O}`},ye=({courseId:t,sectionId:L,milestoneId:Q,setIsLesson:O,lessons:m,currentLesson:j,setCurrentLesson:B})=>{var Z,q,ee,te,se,re,ne,ae,le,de,oe,ce,ie;const{profile:d,setProfile:S,missons:r,setMissons:f,courseOfLearningProcess:c,setCourseOfLearningProcess:R,lessonsOfSummaryLesson:z,setLessonOfSummaryLesson:_}=l.useContext(J),{setIsLoading:k}=l.useContext(ue),[g,F]=l.useState(0),[i,A]=l.useState(j||1),[p,I]=l.useState(m[i-1]&&((Z=m[i-1])==null?void 0:Z.questions)),[x,w]=l.useState(m[i-1]&&m[i-1]._id),W=l.useRef(null),[H,G]=l.useState(0),[K,Y]=l.useState(!1),[M,s]=l.useState([]),[o,y]=l.useState(!1),[T,U]=l.useState(0);l.useEffect(()=>{m.length===0&&O(!1)},[m]),l.useEffect(()=>{(async()=>{var a,N,n;try{k(!0);const h=await v.get(`lessons/${m[i-1]._id}`);I((n=(N=(a=h==null?void 0:h.data)==null?void 0:a.data)==null?void 0:N.lesson)==null?void 0:n.questions),k(!1)}catch(h){return k(!1),h}})(),w(m[i-1]&&m[i-1]._id)},[i,j]);const V=r.map((b,a)=>{if(b.completed===!1)return{index:a,misson:b}}).filter(b=>b!==void 0);let $=[...M];l.useEffect(()=>{V==null||V.map(async b=>{var a,N,n,h;if(((N=(a=b==null?void 0:b.misson)==null?void 0:a.missonId)==null?void 0:N.type)==="questions"&&+T==+((h=(n=b==null?void 0:b.misson)==null?void 0:n.missonId)==null?void 0:h.numberOfRequirements))try{await v.patch(`user_missons/update?missonId=${b.misson.missonId._id}`,{currentProgress:T,status:!0}),await v.patch("users/update_asset",{experiences:b.misson.missonId.experiences,gems:b.misson.missonId.gems,turns:b.misson.missonId.hearts}),f(P=>{const u=[...P];return u[b.index].currentProgress=T,u[b.index].completed=!0,u}),S(P=>{const u={...P};return u.experiences=+u.experiences+ +b.misson.missonId.experiences,u.gems=+u.gems+ +b.misson.missonId.gems,u.hearts=+u.hearts+ +b.misson.missonId.hearts,u}),s(P=>{let u=[...P];return(u==null?void 0:u.findIndex(E=>E.missonId._id.toString()===b.misson.milestoneId._id.toString()))>-1?u:u=[...P,b.misson]}),y(!0)}catch{}})},[T]);const X=l.useCallback(async()=>{if(H!==1){if(G(1),F(g+1),g+1>(p==null?void 0:p.length)-1)try{if(i+1>m.length){k(!0),await v.patch("learning_process/update_milestone",{courseId:t,sectionId:L,milestoneId:Q,currentLesson:j,totalLessonDone:j,status:2});const b=c.findIndex(n=>n.courseId._id.toString()===t.toString()),a=c[b].sections.findIndex(n=>n.sectionId.toString()===L.toString());await v.patch("learning_process/update_section",{courseId:t,sectionId:L,totalMilestoneDone:i,status:c[b].sections[a].totalMilestoneDone+1>=c[b].sections[a].totalMilestone?2:""}),await v.patch("users/update_asset",{experiences:+m[i-1].experiences,gems:+m[i-1].gems,turns:5,dayStreak:Math.random()}),S(n=>{const h={...n};return h.experiences=+h.experiences+ +m[i-1].experiences,h.gems=+h.gems+ +m[i-1].gems,h.hearts=+h.hearts+5,h});const N=V.map(async n=>{var h,P;switch((P=(h=n==null?void 0:n.misson)==null?void 0:h.missonId)==null?void 0:P.type){case"gems":await v.patch(`user_missons/update?missonId=${n.misson.missonId._id}`,{currentProgress:+m[i-1].gems,status:+r[n.index].currentProgress+ +m[i-1].gems>=+r[n.index].missonId.numberOfRequirements}),f(E=>{const D=[...E];return D[n.index].currentProgress=+D[n.index].currentProgress+ +m[i-1].gems,D[n.index].completed=+r[n.index].currentProgress>=+r[n.index].missonId.numberOfRequirements,D}),$=[...$,n.misson];break;case"experiences":await v.patch(`user_missons/update?missonId=${n.misson.missonId._id}`,{currentProgress:+m[i-1].experiences,status:+r[n.index].currentProgress+ +m[i-1].experiences>=+r[n.index].missonId.numberOfRequirements}),f(E=>{const D=[...E];return D[n.index].currentProgress=+D[n.index].currentProgress+ +m[i-1].experiences,D[n.index].completed=+r[n.index].currentProgress>=+r[n.index].missonId.numberOfRequirements,D}),$=[...$,n.misson];break;case"lessons":await v.patch(`user_missons/update?missonId=${n.misson.missonId._id}`,{currentProgress:1,status:+r[n.index].currentProgress+1>=+r[n.index].missonId.numberOfRequirements}),f(E=>{const D=[...E];return D[n.index].currentProgress=+D[n.index].currentProgress+1,D[n.index].completed=+r[n.index].currentProgress>=+r[n.index].missonId.numberOfRequirements,D}),$=[...$,n.misson];break;case"days":const u=me(),C=d.activeDays.includes(u);await v.patch(`user_missons/update?missonId=${n.misson.missonId._id}`,{currentProgress:C?"0":1,status:+r[n.index].currentProgress+C?"0":1>=+r[n.index].missonId.numberOfRequirements}),f(E=>{const D=[...E];return D[n.index].currentProgress=+D[n.index].currentProgress+(C?0:1),D[n.index].completed=+r[n.index].currentProgress>=+r[n.index].missonId.numberOfRequirements,D}),$=[...$,n.misson];break;default:}});await Promise.all(N),k(!1),s(n=>[...n,...$]),Y(!0),y(!0),R(n=>{const h=[...n],P=h.findIndex(E=>E.courseId._id.toString()===t.toString()),u=h[P].sections.findIndex(E=>E.sectionId.toString()===L.toString());h[P].sections[u].totalMilestoneDone=+h[P].sections[u].totalMilestoneDone+1,h[P].sections[u].status=h[P].sections[u].totalMilestoneDone>=h[P].sections[u].totalMilestone?2:1;const C=h[P].sections[u].milestones.findIndex(E=>E.milestoneId.toString()===Q.toString());return h[P].sections[u].milestones[C].currentLesson=i+1,h[P].sections[u].milestones[C].status=2,h}),G(0);return}else{k(!0),await v.patch("users/update_asset",{experiences:+m[i-1].experiences,gems:+m[i-1].gems,turns:5,dayStreak:Math.random()}),S(a=>{const N={...a};return N.experiences=+N.experiences+ +m[i-1].experiences,N.gems=+N.gems+ +m[i-1].gems,N.hearts=+N.hearts+5,N}),await v.patch("learning_process/update_milestone",{courseId:t,sectionId:L,milestoneId:Q,currentLesson:j,totalLessonDone:j});const b=V.map(async a=>{var N,n;switch((n=(N=a==null?void 0:a.misson)==null?void 0:N.missonId)==null?void 0:n.type){case"gems":await v.patch(`user_missons/update?missonId=${a.misson.missonId._id}`,{currentProgress:+m[i-1].gems,status:+r[a.index].currentProgress+ +m[i-1].gems>=+a.misson.missonId.numberOfRequirements}),f(u=>{const C=[...u];return C[a.index].currentProgress=+C[a.index].currentProgress+ +m[i-1].gems,C[a.index].completed=+r[a.index].currentProgress>=+a.misson.missonId.numberOfRequirements,C}),$=[...$,a.misson];break;case"experiences":await v.patch(`user_missons/update?missonId=${a.misson.missonId._id}`,{currentProgress:+m[i-1].experiences,status:+r[a.index].currentProgress+ +m[i-1].experiences>=+a.misson.missonId.numberOfRequirements}),f(u=>{const C=[...u];return C[a.index].currentProgress=+C[a.index].currentProgress+ +m[i-1].experiences,C[a.index].completed=+r[a.index].currentProgress>=+a.misson.missonId.numberOfRequirements,C}),$=[...$,a.misson];break;case"lessons":await v.patch(`user_missons/update?missonId=${a.misson.missonId._id}`,{currentProgress:1,status:+r[a.index].currentProgress+1>=+a.misson.missonId.numberOfRequirements}),f(u=>{const C=[...u];return C[a.index].currentProgress=+C[a.index].currentProgress+1,C[a.index].completed=+r[a.index].currentProgress>=+a.misson.missonId.numberOfRequirements,C}),$=[...$,a.misson];break;case"days":const h=me(),P=d.activeDays.includes(h);await v.patch(`user_missons/update?missonId=${a.misson.missonId._id}`,{currentProgress:P?"0":1,status:+r[a.index].currentProgress+P?"0":1>=+r[a.index].missonId.numberOfRequirements}),f(u=>{const C=[...u];return C[a.index].currentProgress=+C[a.index].currentProgress+(P?0:1),C[a.index].completed=+r[a.index].currentProgress>=+r[a.index].missonId.numberOfRequirements,C}),$=[...$,a.misson];break;default:break}});await Promise.all(b),k(!1),s(a=>[...a,...$]),Y(!0),y(!0),B(i+1),R(a=>{const N=[...a],n=N.findIndex(u=>u.courseId._id.toString()===t.toString()),h=N[n].sections.findIndex(u=>u.sectionId.toString()===L.toString()),P=N[n].sections[h].milestones.findIndex(u=>u.milestoneId.toString()===Q.toString());return N[n].sections[h].milestones[P].currentLesson=i+1,N}),G(0)}}catch{G(0)}G(0)}},[g]),xe=()=>{O(!1)};return l.useEffect(()=>{W.current.style.width=g/(p==null?void 0:p.length)*100+"%"},[p,g]),l.useEffect(()=>{(async()=>{if(!(z.findIndex(N=>N.lesson._id.toString()===x.toString())>-1))try{await v.patch("summary_lesson/add_lesson",{lessonId:x}),_(N=>{const n=[...N];return n.push({lesson:{_id:x},wrongQuestions:[]}),n})}catch{}})()},[x]),e.jsxs(e.Fragment,{children:[K&&e.jsx(be,{lessons:m,currentLesson:j,setIsCongratulation:Y,setIsLesson:O}),e.jsx(je,{listMisson:M,setListMisson:s,isShowInfoMisson:o,setIsShowInfoMisson:y}),e.jsxs("div",{className:"relative h-screen w-full py-6",children:[e.jsxs("ul",{className:"mx-auto flex w-[90%] items-center justify-center md:w-[75%]",children:[e.jsx("li",{children:e.jsx("i",{onClick:xe,className:"fa-solid fa-arrow-left cursor-pointer text-2xl md:text-3xl"})}),e.jsx("li",{className:"mx-3 h-4 w-full rounded-md bg-[#e5e5e5]",children:e.jsx("div",{ref:W,className:"ml-[2px] mt-[2px] h-[0.8rem] w-[0%] rounded-md bg-red-600 transition ease-linear"})}),e.jsxs("li",{className:"flex items-center justify-center",children:[e.jsx("img",{src:"/images/logo/heart.webp",className:"h-7 w-7"}),e.jsx("p",{className:"lazyload ml-1 flex items-center justify-center font-noto text-2xl font-medium text-red-600 md:text-3xl",children:d!=null&&d.hearts?d==null?void 0:d.hearts:0})]})]}),p&&((ee=(q=p[g])==null?void 0:q.question)==null?void 0:ee.type)==="choose"?e.jsx(fe,{question:(te=p[g])==null?void 0:te.question,lessonId:x,handleNextQuestion:X,setQuestionsCorrect:U}):p&&((re=(se=p[g])==null?void 0:se.question)==null?void 0:re.type)==="match"?e.jsx(he,{question:(ne=p[g])==null?void 0:ne.question,lessonId:x,handleNextQuestion:X,setQuestionsCorrect:U}):p&&((le=(ae=p[g])==null?void 0:ae.question)==null?void 0:le.type)==="fill"?e.jsx(pe,{question:(de=p[g])==null?void 0:de.question,lessonId:x,handleNextQuestion:X,setQuestionsCorrect:U}):p&&((ce=(oe=p[g])==null?void 0:oe.question)==null?void 0:ce.type)==="rearrange"?e.jsx(ge,{question:(ie=p[g])==null?void 0:ie.question,lessonId:x,handleNextQuestion:X,setQuestionsCorrect:U}):""]})]})};export{ye as default};
