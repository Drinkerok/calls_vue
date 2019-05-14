import Modal from '@/components/Modal.vue';

export default ({ context, params }) => {
  context.$modal.show(
    Modal,
    {
      ...params
    },
    {
      width: '913px',
      height: 'auto'
    }
  )
}