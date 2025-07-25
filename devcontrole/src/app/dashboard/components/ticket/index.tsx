"use client"
import { FiCheckSquare, FiFile} from 'react-icons/fi'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

import { ModalContext } from "@/providers/modal"
import { useContext } from 'react'

interface TicketItemProps{
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem( { ticket, customer }: TicketItemProps ){
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
            })

            router.refresh();
            
        }catch(err){
            console.log(err);
        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        });
    }

    return(
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">
                    {customer?.name}
                </td>
                <td className="text-left hidden sm:table-cell">
                    {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className="text-left">
                    <span className={`px-2 py-1 rounded-md text-white ${ticket.status === "ABERTO" ? "bg-green-500" : "bg-red-500"}`}>{ticket.status}</span>
                </td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
                
            </tr>
        </>
    )
}