import { FETCH_FLEES_BY_RECEIVER,FETCH_FLEES_BY_SENDER,subgraphQuery } from "../components";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {contractAddress, abi , erc20Abi} from "../constants/index";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface Flee {
    id: string;
    sender: string;
    receiver: string;
    amount: string;
    token: string;
    startTime: string;
    stopTime: string;
    cancelled: boolean;
    claimed: boolean;
}


import { useAccount,useSigner } from "wagmi"; 


export default function MyFlees() {
    const [data, setData] = useState< Flee[]>([]);
    const [receiver, setReceiver] = useState<boolean>(false);
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer, isError, isLoading } = useSigner();


    const cancelFlee = async (id: string) => {
        try{
            const contract = new ethers.Contract(contractAddress, abi, signer as ethers.Signer);
            const tx = await contract.cancelFlee(id);
            await tx.wait();
            toast.success("Flee cancelled successfully");
        }
        catch(err: any){
            alert(err);
        }
    }

    const withdrawFlee = async (id: string) => {
        try{
            const contract = new ethers.Contract(contractAddress, abi, signer as ethers.Signer);
            const tx = await contract.withdrawFromFlee(id);
            await tx.wait();
            toast.success("Withdrawn successfully");
        }
        catch(err: any){
            alert(err);
        }
    }



    const getFlees = async () => {
        const data = await subgraphQuery(FETCH_FLEES_BY_SENDER(address || ""));
        setData(data.flees);
    }

    const getReceiveFlees = async () => {
        const data = await subgraphQuery(FETCH_FLEES_BY_RECEIVER(address || ""));
        setData(data.flees);
    }

    useEffect(() => {
        if(receiver){
            getReceiveFlees();
        }
        else{
            getFlees();
        }
    }, [receiver]);

    console.log(new Date())
    return (
        <div className="text-white px-20 font-['Fasthand'] overflow-hidden mt-4">
            <div className="flex gap-28 items-center text-2xl justify-center ">
                <button className="px-8 py-2 rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" onClick={()=>{setReceiver(false)}}>Your Flees</button>
                <button className="px-8 py-2  rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" onClick={()=>{setReceiver(true)}}>Receiving Flees</button>
            </div>
            <div className="border-0 border-white mt-4 h-[32rem] p-4 bg-gray-900">
                <div className="flex text-xl px-10">
                    <p className="w-96">{receiver ? "Sender" : "Receiver"}</p>
                    <p className="w-20 ml-10">Amount</p>
                    <p className="w-28 ml-20">startTime</p>
                    <p className="w-28 ml-28">endTime</p>
                    <p className="ml-20">status</p>
                    <p></p>
                </div>
                {
                    data && data?.map((flee) => {
                        const startTime = new Date(parseInt(flee.startTime) * 1000).toLocaleString();
                        const stopTime = new Date(parseInt(flee.stopTime) * 1000).toLocaleString();
                        const status= stopTime > new Date().toLocaleString() ? "Active" : "Completed";
                        return (
                            <div className="flex text-xl px-10 py-3 items-center" key={flee.id}>
                                <p className="w-96">{!receiver ? flee.receiver : flee.sender}</p>
                                <p className="w-10 ml-12">{ethers.utils.formatEther(flee.amount)}</p>
                                <p className="w-52 ml-20">{startTime}</p>
                                <p className="w-52 ml-2">{stopTime}</p>
                                <p className="ml-2 w-20">{flee.cancelled ? "Canceled" : status }</p>
                                {
                                    flee.cancelled === null && !receiver && status === "Active" ? <button className="ml-16 p-2 rounded-xl bg-red-600" onClick={()=>cancelFlee(flee.id)}>Cancel</button> : ""
                                }
                                {
                                    receiver && !flee.cancelled && status === "Completed" ? flee.claimed ? <p className="ml-16 p-2 rounded-xl bg-blue-500 px-4">Claimed</p>:<button className="ml-16 p-2 rounded-xl bg-green-600" onClick={()=>withdrawFlee(flee.id)}>Claim</button> : ""
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
            