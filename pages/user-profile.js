function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// 이걸 쓴다는 것 자체가
// pre-generated가 아니라는 것임.
// 이 말은 즉, request 할 때 마다 페이지를 던진다는 말로 이해하면 되겠음.
// 그럴때는 getStaticProps를 사용하는 것이 아니라 getServerSideProps를 사용하면 된다는 것임.
// 그 이외의 syntax는 같다고 보면 됨.
// notFound나 props나 뭐 이런거 형태가 같음.
export async function getServerSideProps(context) {
  // req, res를 받을 수 있다는 것이다.
  // req를 조작하거나 res를 조작할 수 있다는 것이다.
  // header를 바꾸거나 cookie를 여기서 설정할 수 있을 것이다.
  const { params, req, res } = context;

  //   console.log(req);
  //   console.log(res);

  return {
    props: {
      username: "Max",
    },
  };
}
