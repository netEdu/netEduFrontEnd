
function validation(){
    if (sessionStorage.getItem("authKey") == null) {
        alert("请先登录");
        window.location.href = '/login'
    }
}
    export {
        validation
    }


