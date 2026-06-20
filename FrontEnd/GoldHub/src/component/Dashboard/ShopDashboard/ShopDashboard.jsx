import { Edit, Eye, Heart, Image as ImageIcon, Package, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import  Button  from "../../Ui/Button/Button";
import Card from "../../Card/Card";
import Input from "../../Input/Input";

function ShopDashboard() {

    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        title:"",
        type:"Ring",
        color:"Yellow Gold",
        style:"Classic",
        description:"",
        sizes:[]
    });


    const products = [
        {
            id:1,
            title:"Elegant Diamond Ring",
            type:"Ring",
            image:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300",
            views:234,
            favorites:12,
            status:"Active"
        },
        {
            id:2,
            title:"Gold Chain Bracelet",
            type:"Bracelet",
            image:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300",
            views:156,
            favorites:15,
            status:"Active"
        }
    ];


    const stats=[
        {
            label:"Total Products",
            value:"24",
            icon:Package
        },
        {
            label:"Total Views",
            value:"1234",
            icon:Eye
        },
        {
            label:"Favorites",
            value:"89",
            icon:Heart
        }
    ];


    const sizes=["Small","Medium","Large","XL"];


    const handleSizeToggle=(size)=>{

        setFormData(prev=>({
            ...prev,
            sizes:
            prev.sizes.includes(size)
            ?
            prev.sizes.filter(item=>item!==size)
            :
            [...prev.sizes,size]
        }))

    }



return(

<div className="p-4">


<div className="d-flex justify-content-between align-items-center mb-4">

<div>
<h1>Shop Dashboard</h1>
<p className="text-muted">
Manage your jewelry products
</p>
</div>


<Button
onClick={()=>setShowAddModal(true)}
>
<Plus size={20}/>
Add Product
</Button>


</div>



<div className="row g-4 mb-4">

{
stats.map(stat=>{

const Icon = stat.icon;

return(

<div className="col-md-4" key={stat.label}>

<Card>

<div className="p-4 d-flex justify-content-between">

<div>

<p>{stat.label}</p>

<h2>{stat.value}</h2>

</div>


<Icon/>

</div>

</Card>


</div>

)

})
}

</div>





<Card>

<div className="p-4">


<h3>
Your Products
</h3>


<table className="table">

<thead>

<tr>

<th>
Product
</th>

<th>
Type
</th>

<th>
Views
</th>

<th>
Favorites
</th>

<th>
Actions
</th>


</tr>

</thead>



<tbody>


{
products.map(product=>(

<tr key={product.id}>


<td>

<div className="d-flex align-items-center gap-3">

<img
src={product.image}
width="50"
height="50"
/>

{product.title}


</div>

</td>



<td>
{product.type}
</td>



<td>

<Eye size={16}/>
{product.views}

</td>


<td>

<Heart size={16}/>
{product.favorites}

</td>



<td>


<button className="btn">

<Edit size={18}/>

</button>


<button className="btn">

<Trash2 size={18}/>

</button>


</td>



</tr>


))
}



</tbody>



</table>


</div>

</Card>






{
showAddModal &&


<div className="modal d-block bg-dark bg-opacity-50">


<div className="modal-dialog">


<div className="modal-content">


<div className="modal-header">

<h2>
Add Product
</h2>

</div>




<div className="modal-body">


<Input

label="Title"

value={formData.title}

onChange={(e)=>

setFormData({
...formData,
title:e.target.value
})

}

/>



<label>
Type
</label>


<select
className="form-control mb-3"

value={formData.type}

onChange={(e)=>

setFormData({
...formData,
type:e.target.value
})

}

>

<option>
Ring
</option>

<option>
Bracelet
</option>


<option>
Necklace
</option>


</select>




<label>
Sizes
</label>


<div>


{
sizes.map(size=>(


<button

key={size}

className="btn btn-outline-dark m-1"

onClick={()=>handleSizeToggle(size)}

>

{size}

</button>


))
}


</div>



<textarea

className="form-control mt-3"

placeholder="Description"

onChange={(e)=>

setFormData({
...formData,
description:e.target.value
})

}


/>



</div>





<div className="modal-footer">


<Button

onClick={()=>setShowAddModal(false)}

>

Cancel

</Button>



<Button>

<Upload size={18}/>

Add

</Button>


</div>



</div>

</div>

</div>


}




</div>

)

}


export default ShopDashboard;