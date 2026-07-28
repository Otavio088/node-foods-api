// Executa a conexão via knex e faz atribuição no objectionjs

const knexfile = require('../../knexfile');
const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex(knexfile.development);
Model.knex(knex);

module.exports = knex;
