import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // fallback을 false로 하고
  // 만약에 p3로 바로 진입하게 되면은
  // data를 fetching할 시간이 없게 된다.
  // 그렇기 떄문에 loadedProduct가 null일때는
  // 이렇게 예외처리를 해줘야 한다는 것이다.
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>TITLE</h1>
      <p>DESCRIPTION</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // context 라는 것을 통해서 url의 params 정보를 얻을 수 있다는 것이다.
  // 여기는 데이터를 어떻게 가져 올 것인가에 대해서 명시를 하는 것 같고.
  // getStaticPaths는 어떤 것들을 pre generated를 해야하는 것을 명시하는 것 같다.
  // 이 concept를 잘 이해하도록 해야 한다.
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id == productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    //   이렇게 path를 정해주는 이유는 이것도 결국 build될 떄
    //   페이지를 리턴하게 만들어야 하는데 pid라는 것은 사실 동적이다.
    //   그렇기 때문에 nextjs의 입장에서는 pid가 몇개나 존재하는지 모른다.
    //   그것에 대한 정보를 미리 알려주는 것이고
    //   이 path에 의해서 context로 넘어가는 것이라고 생각하면 될 것 같다.
    //   근데 만약에 엄청나게 많은 pid가 존재한다면은 어쩔꺼임?
    //   그럴때는 react가 하는 것 처럼, 그떄그때마다 요청하는 식으로 가야 할 것 같은데
    //   나중에 어떻게 해결하는지를 보자.
    //   build를 해보면은 알겠지만, p1.json 뭐 이런것이 생긴다.
    //   미리 그 데이터를 다 load하기 떄문에 request를 날릴 이유가 없는 것임.
    paths: [
      {
        params: { pid: "p1" },
      },
      //   {
      //     params: { pid: "p2" },
      //   },
      //   {
      //     params: { pid: "p3" },
      //   },
    ],
    // 이렇게 fallback을 false로 하면은 pre generated 하게 만드는 것이라고
    // 하는 것 같다.
    // fallback을 true로 한다면은 p1, p2, p3를 한번에 가져오지 않는다는 것임.
    // 예를 들면은 p1의 product는 매우 자주 방문되어서 미리 패칭해놓으면은 좋지만,
    // p2, p3는 그닥 많이 방문하지 않기떄문에 미리 패칭해올 필요가 없다고 생각해보자.
    // 그럴떄 이 fallback을 true로 사용하고 원하는 것만 미리 패칭하도록 만들면 된다.
    fallback: true,
  };
}

export default ProjectDetailPage;
