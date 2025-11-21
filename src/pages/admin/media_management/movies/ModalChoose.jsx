import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Fade,
  Slide,
} from "@mui/material";

// Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="up" ref={ref} {...props} />
    </Fade>
  );
});

export default function AddFeature({ textSearch,setTextSearch,openChoose, handleCloseChoose, dataChoose, typeChoose, handleClickChoose, getDataChoose }) {
  const check = (id) => getDataChoose.includes(id);
  return (
    <Dialog
      open={openChoose}
      onClose={handleCloseChoose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle className="flex justify-between items-center">
        <h1>Choose</h1>
        <div>
          <input value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}
            className="rounded-md border px-3 py-1 outline-none"
            type="text"
            placeholder="Enter keyword..."
          />
        </div>
      </DialogTitle>

      <DialogContent className="flex gap-2 m-2 flex-wrap">
        {dataChoose.map((item) => {
          if (typeChoose === "category") {
            return (
              <button onClick={() => handleClickChoose(item.id)}
                key={item.id}
                className={`text-nowrap px-3 hover:bg-amber-200  py-1 rounded-md border border-gray-300 hover:shadow-md transition-all duration-200${check(item.id) ? ' bg-amber-400' : 'bg-red-500'}`}
              >
                {item.name}
              </button>
            );
          }

          if (typeChoose === "actor") {
            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center"
                style={{ width: 100, height: 100 }}

              >
                <Avatar onClick={() => handleClickChoose(item.id)}
                  src={item.imgUrl}
                  alt={`${item.name} image`}
                  sx={{
                    width: 60,
                    height: 60,
                    zIndex: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  }}
                />

                <svg
                  viewBox="0 0 200 200"
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <defs>
                    <path
                      id={`circlePath-${item.id}`}
                      d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>

                  <text

                    className={`${check(item.id) ? "fill-green-600" : "fill-gray-400"} font-bold text-[16px] tracking-wider`}


                  >
                    <textPath
                      href={`#circlePath-${item.id}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {item.name}
                    </textPath>
                  </text>
                </svg>
              </div>
            );
          }

          if (typeChoose === "character") {
            return (
              <div
                key={item.id}
                className={`${check(item.id)
                  ? 'w-[180px] p-3 rounded-xl border border-gray-200 shadow-sm bg-amber-100 hover:shadow-lg transition-all duration-200'
                  : 'w-[180px] p-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200'
                  }`}

              >
                <Avatar onClick={() => handleClickChoose(item.id)}
                  src={item.imgUrl}
                  alt={`${item.name} image`}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                />

              </div>
            );

          }

          return null;
        })}
      </DialogContent>
    </Dialog>
  );
}
