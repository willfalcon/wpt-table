import TableEdit from './TableEdit';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('wpt/table', {
  title: __('Table'),
  // category: 'cdhq',
  supports: {
    aligns: ['wide', 'full'],
  },
  attributes: {
    table: {
      type: 'number',
    },
  },
  edit: TableEdit,
});
