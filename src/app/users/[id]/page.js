"use client"
import { useProfile } from "../../components/layout/Useprofile";
import UserTabs from "../../components/layout/UserTabs";


export default function EditUserPage() {
    const{loading, data} = useProfile();

    if (loading) {
        return "loading user info...";
      }


    return(
        <section className="mt-8 mx-auto max-w-2xl" >
            <UserTabs isadmin={true}/>
            <div className="mt-8">
                user info form
            </div>

        </section>
    );
}