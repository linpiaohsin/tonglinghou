<template>
<div class="warper">
  <!-- <Header></Header> -->
<div class='container'>
<router-view/>
</div>
<Footer></Footer>
</div>

</template>
<script>
import Header from '@/views/template/header.vue'
import Footer from '@/views/template/footer.vue'
export default {
  components: { Header, Footer }
}
</script>
<style scoped>
*{
            margin:0;
            padding: 0;
        }
        .container{

            overflow:hidden;

        }
        .warper{
            height:100%;
            /* width: 100%; */
            /* padding-top: 3rem; */
            /* padding-bottom: 3rem; */
            /* position: relative; */
        }
        .header{
            text-align: center;
            height:5rem;
            width: 100%;
            background-color: red;
            position: fixed;
            top: 0;

        }
        .footer{
            text-align: center;
            height:45px;
            width: 100%;
            background-color: rgba(0,255,255,0.5);
            position: fixed;
            bottom: 0;
        }
        .item{
            height: 2rem;
            border-bottom: .1rem solid;
        }
        .container .baseline{
            min-height:100%;
            height:100%;
            overflow:auto;
        }
        .baseline > p:nth-of-type(odd){
            background-color: pink
        }
        .baseline > p:nth-of-type(even){
            background-color: lightgreen
        }
</style>
