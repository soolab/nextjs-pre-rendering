import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// 이렇게 메소드를 정의해준다.
// 이것은 props를 미리 준비해준다.
// 실행이 된다면 Next.js가 이 getStaticProps가 먼저 실행이 되고
// return 되는 Props를 HomePage에 넘겨준다음
// HomePage가 render되는 것이라고 생각하면 된다.
// build 될 때 이러한 과정이 생긴다 라는 것인가?
// 그럼 완전히 다이나믹한 부분은 이렇게 build되어서 나가면 안되고
// React 처럼 그떄그떄마다 인터랙션을 해야 할 것 같은데
// 이 부분은 나중에 참고하도록 하자.

export async function getStaticProps(context) {
  console.log("Re generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // 이런식으로 redirect를 사용할 수 있음.
  // data 자체가 없으면 말이다.
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  // 이런식으로 notFound를 사용하는 것이
  // 좋은 것이다. 데이터가 뭔가 패칭이 안되었을떄
  // 404 페이지로 이동하는 것은 자연스럽기 떄문이다.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // 특정한 옵션을 주지 않는다면은
    // build 할 때 딱 한 번만 해당 props가 결정이 나게 된다.
    // 하지만 이렇게 되면은 매번 빌드할 수 도 없고, 한계가 있기 마련이다.
    // 하지만 아래의 옵션을 걸어주면은 몇 초 마다 해당 props를 업데이트 해주기 떄문에
    // 한계를 극복할 수 있다는 것이다.
    revalidate: 10,

    // 이 옵션을 추가하면은 404페이지가 된다.
    // 만약 데이터가 패칭되지 않는다면은 이 페이지를 띄우기 위해서이다.
    // notFound: true
  };
}

export default HomePage;
