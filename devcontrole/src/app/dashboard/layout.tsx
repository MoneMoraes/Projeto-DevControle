import { DashboardHeader } from '@/app/dashboard/components/header'

export default function dashboardLayout({ children }: { children: React.ReactNode}){
    return(
        <>
            <DashboardHeader />
            {children}
        </>
    )
}