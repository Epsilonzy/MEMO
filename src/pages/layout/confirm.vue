<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Use Google's location service?"
      md-content="Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running."
      md-confirm-text="确认"
      md-cancel-text="取消"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
  export default {
    name: 'DialogConfirm',
    data: () => ({
      active: false,
      value: null
    }),
    methods: {
      onConfirm () {
        // this.value = 'Agreed'
      },
      onCancel () {
        // this.value = 'Disagreed'
      }
    }
  }
</script>
