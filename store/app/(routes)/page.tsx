import { getBillboards } from '@/actions/get-billboards'
import Billboard from '@/components/ui/billboard'
import Container from '@/components/ui/container'

export default async function Home() {
  const billboard = await getBillboards(`64d89a558bb197637b1da584`)
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}
