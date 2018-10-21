var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    message.channel.sendMessage(':x: **Não há nada tocando.**')
  } else {
    if (message.member.voiceChannel) {
      if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
        if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ')) {
          if (musicas.queue.get(message.guild.id).som.atividade[musicas.queue.get(message.guild.id).atual] === 'tocando') {
            musicas.queue.get(message.guild.id).som.atividade[musicas.queue.get(message.guild.id).atual] = 'pausado'
            musicas.queue.get(message.guild.id).connection.pause()
            message.channel.sendMessage(':notes: **Música pausada.**')
          } else {
            message.channel.sendMessage('**:x: Música já está pausada.**')
          }
        } else {
          message.channel.sendMessage(':thinking: | **É necessário que você tenha o cargo `DJ` ou tenha adicionado a música.**')
        }
      } else {
        message.channel.sendMessage(':x: **Você não está no canal em que estou tocando.**')
      }
    } else {
      message.channel.sendMessage(':x: **Você não está em um canal de voz.**')
    }
  }
}
