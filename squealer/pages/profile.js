import Layout from "@/app/Components/Layout";
import Card from "@/app/Components/Card";
import Avatar from "@/app/Components/Avatar";


export default function ProfilePage() {
 return(
  <Layout>
    <Card noPadding={true}>
      <div className="relative">
        <div className="h-36 overflow-hidden flex justify-center">
          <img src= "https://unsplash.com/it/foto/awoZjAvnBwc" alt="sfondo"></img>
        </div>
        <div className="p-4">
          Nome Cognome
        </div>
      </div>
    </Card>
  </Layout>
 );
}