import { useRouter } from 'vue-router'

export function useGotoRouter() {

  const router = useRouter()

  const handleGotoLogin = () => {

    router.push('/login')

  }

  const handleGotoDashboard = () => {

    router.push('/dashboard')

  }

  const handleGotoPage = (route) => {

    router.push({ name: route })

  }

  const handleGoToPageWithIdParams = (route, params) => {

    router.push({ name: route, params: { id: params } })

  }

  return {
    handleGotoLogin,
    handleGotoDashboard,
    handleGotoPage,
    handleGoToPageWithIdParams,
  }

}
