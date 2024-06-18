import './App.css';
import Post from './components/post'
import data from './components/data'
import Navbar from './components/navbar'

function App() {
let postData = data.map((post) => (
<Post 
key = {post.id}
{...post}
/>
))

  return (
    <div className="App">
      <Navbar/>
      <div className='content'>

       {postData}
       </div>
    </div>
  );
}

export default App
