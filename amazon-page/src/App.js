import React from 'react';
import './App.css';

import ItemsContent from './components/ItemsContent';
// import data from './data.json';
import AdminView from './components/AdminView';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[],
      productSearchString:"",
      adminModeActive: false,

      // newItemDescription:"",
      // newItemSeller:"",
      // newItemPrice:"",
      // newItemShipping:"",
      // newItemArrives:"",
      // newItemImage:"",
    }
  }

//API server: 
  componentDidMount() {
    console.log("Mounted")
    axios.get('http://localhost:3000/products')
    .then(response=>{
      console.log(response);
      this.setState({items: response.data.items});

    })
    .catch(err => console.log(err));
  }
    
  onSearchFieldChange = (event) => {
    console.log('hfh');
    console.log(event.target.value);
    this.setState({productSearchString:event.target.value});
  
  }

addNewItem=(description, seller, price, shipping, arrives)=>{

  axios.post('http://localhost:3000/products', {
    
    description: description,
    seller: seller,
    price: price,
    shipping: shipping,
    arrives: arrives,

  });


  let newItems= [...this.state.items];
  newItems.push({
    
    id: newItems.length + 1,
    // description:this.state.newItemDescription,
    // seller:this.state.newItemSeller,
    // price:this.state.newItemPrice,
    // shipping:this.state.newItemShipping,
    // arrives:this.state.newItemArrives,
    // image:this.state.newItemImage,
    description: description,
    seller: seller,
    price: price,
    shipping: shipping,
    arrives: arrives,

  });

  this.setState({
    items:newItems
  })
}

deleteItem = itemId=> this.setState({ items:this.state.items.filter(
  item=> item.id !== itemId
)})

 render()
 {
  let output= 
    <> 
    <div>
      Search
    <input type="text" onChange ={ this.onSearchFieldChange} value={this.state.productSearchString} />
    </div>
    
    <ItemsContent
    items ={ this.state.items.filter(item =>item.seller.includes(this.state.productSearchString))}
    
    />
    <button onClick={() => this.setState({adminModeActive: !this.state.adminModeActive})}>Admin mode</button>
    </>


  if(this.state.adminModeActive) {
    output = <AdminView
                disableAdminMode={() => this.setState({adminModeActive: false}) }
                addNewItem={ this.addNewItem }
                items={ this.state.items }
                deleteItem={ this.deleteItem }
             />;
  }



  return (
    <>
      { output }
    </>
  );
}
}

export default App;
