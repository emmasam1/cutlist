import React from 'react'
import { Button, Input } from "antd";

const Cutlist = () => {
  return (
    <div>
         <div>
            <h2 className="font-semibold">Cut Type</h2>
            <div className="flex gap-6 mt-1">
              <Button className="rounded-full bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black">
                Door Cut
              </Button>
              <Button className="rounded-full bg-[#fcfcfca4] hover:!bg-[#fcfcfca4] hover:!text-black border-none">
                Door Cut
              </Button>
              <Button className="rounded-full bg-[#fcfcfca4] hover:!bg-[#fcfcfca4] hover:!text-black border-none">
                Door Cut
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Measuremente</h2>
              <span className="text-[#f2994a]">(2 Long)</span>
            </div>
            <div className="flex gap-6 mt-1">
              <Input placeholder="Height" />
              <Input placeholder="Weight" />
              <Input placeholder="Dept" />
            </div>
          </div>

          <div className="mt-52 border-t-[.1rem]">
            <p className="mt-3">
              <span className="text-[#F2994A] font-semibold text-lg">
                LNG &nbsp; 
              </span>
              - Means (Long).
            </p>
            <p>
              <span className="text-[#F2994A] font-semibold text-lg">
              F-E-T&nbsp;
              </span>
              - Means (Long).
            </p>
            <p>
              <span className="text-[#F2994A] font-semibold text-lg">
                & &nbsp;
              </span>
              - Means (And).
            </p>
          </div>
    </div>
  )
}

export default Cutlist