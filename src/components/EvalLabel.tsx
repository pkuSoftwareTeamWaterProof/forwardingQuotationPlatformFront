'use client'

export function EvalLabel({score, comment}:{score:number,comment:string}){
  return (<>
  <div className="rounded shadow-2xl mt-6 py-2 px-6 ">
    <div className="font-bold text-3xl my-2">{score}</div>
    <div>{comment}</div>
  </div>
  </>)
}