import { useMyPresence, useOthers } from "@liveblocks/react";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useState } from "react";
import CursorChat from "./cursor/CursorChat";

 

function Live() {
    const others = useOthers();
    const [{cursor}, updateMyPresence] = useMyPresence() as any;

    const[cursorState, setCursorState] = useState({mode: CurssorMode.Hidden, })

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
      event.preventDefault();

      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({cursor: {x,y}});
    }, [])
    const handlePointerDown= useCallback((event: React.PointerEvent) => {
       

      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({cursor: {x,y}});
    }, [])
    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
      event.preventDefault();
      updateMyPresence({cursor: {cursor: null, message: null}});
    }, [])


  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    onPointerDown={handlePointerDown}
    className="h-[100vh] w-full flex justify-center items-center text-center border-5 border-red-800"
    >
      <h1 className="text-5xl text-white">hello</h1>
      {cursor && (<CursorChat
      cursor={cursor}
      
         
      />)}





      <LiveCursors others={others} />
    </div>
  )
}

export default Live;
