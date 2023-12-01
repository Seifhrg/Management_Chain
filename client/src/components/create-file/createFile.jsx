import React, { useRef } from "react";

function CreateFile(props) {
  console.log("*******/////////*********");
  var inf = useRef(null);
  if (props.forF) {
    inf.current = props.forF;
    console.log(props.forF);
  }

  var hosts = [];
  var switchs = [];
  var controlers = [];
  var edges = [];
  var ports = [];
  var links = [];

  for (let i = 0; i < inf.current.nodes.length; i++) {
    if (inf.current.nodes[i].id.charAt(0) === "H") {
      hosts.push(inf.current.nodes[i]);
    } else if (inf.current.nodes[i].id.charAt(0) === "S") {
      switchs.push(inf.current.nodes[i]);
    } else {
      controlers.push(inf.current.nodes[i]);
    }
  }

  for (let index = 0; index < inf.current.edges.length; index++) {
    for (let i = 0; i < inf.current.nodes.length; i++) {
      for (let x = 0; x < inf.current.nodes[i].data.ports.length; x++) {
        if (
          inf.current.nodes[i].data.ports[x].linkKey ===
          inf.current.edges[index].id
        ) {
          var portNum = inf.current.nodes[i].data.ports[x].num;
          var nodeName = inf.current.nodes[i].id;
          var idKey = inf.current.edges[index].id;
          ports.push({ nodeName, portNum, idKey });
        }
      }
    }
  }

  console.log("***********ports*****************");
  console.error(ports);

  var sourcee;
  var targett;
  var idd;
  var sourcePort;
  var targetPort;
  var band;
  var del;

  ////////////

  for (let index = 0; index < inf.current.edges.length; index++) {
    for (let a = 0; a < ports.length; a++) {
      if (inf.current.edges[index].id === ports[a].idKey) {
        if (inf.current.edges[index].source === ports[a].nodeName) {
          //remplir par la source
          sourcee = ports[a].nodeName;
          sourcePort = ports[a].portNum;
          idd = ports[a].idKey;
          band = inf.current.edges[index].extData.bandwith;
          del = inf.current.edges[index].extData.delay;

          links.push({ sourcee, sourcePort, idd, band, del });
          console.log("source", ports[a].nodeName);
        }
      }
    }
  }

  for (let index = 0; index < inf.current.edges.length; index++) {
    for (let a = 0; a < ports.length; a++) {
      for (let i = 0; i < links.length; i++) {
        if (
          inf.current.edges[index].target === ports[a].nodeName &&
          ports[a].idKey === links[i].idd &&
          links[i].idd === inf.current.edges[index].id
        ) {
          targett = ports[a].nodeName;
          targetPort = ports[a].portNum;
          links[i] = { ...links[i], targett, targetPort };
        }
      }
    }
  }

  console.log("***********links*****************");
  console.error(links);

  var linksWithoutport = [];
  for (let index = 0; index < edges.length; index++) {
    var verif = false;
    for (let i = 0; i < links.length; i++) {
      if (links[i].idd === edges[index].id) {
        verif = true;
      }
    }
    if (verif === false) {
      var id = edges[index].id;
      var src = edges[index].source;
      var tar = edges[index].target;
      var bw = edges[index].extData.bandwith;
      var delay = edges[index].extData.delay;
      linksWithoutport.push({ id, src, tar, bw, delay });
    }
  }
  console.log("***********linksWithoutport*****************");
  console.error(linksWithoutport);

  const generateFile = () => {
    const element = document.createElement("a");
    const content = [];
    content.push(
      `from mininet.net import Mininet\nfrom mininet.node import OVSSwitch, Controller, RemoteController \nfrom mininet.cli import CLI\nfrom mininet.log import setLogLevel, info\nfrom mininet.link import TCLink\nfrom time import time,sleep

def fun():\n`
    );
    content.push(`      net = Mininet(topo=None, build=False,link=TCLink)\n`);

    content.push("      info( '* Adding controller' )\n");
    controlers.forEach((item) => {
      content.push(
        "      " +
          item.id +
          " = " +
          " net.addController( '" +
          item.id +
          "',controller=RemoteController, ip='" +
          item.data.extData.ipAddress +
          "',mac='" +
          item.data.extData.macAddress +
          "',port=" +
          item.data.extData.portTcp +
          ")" +
          "\n"
      );
    });

    content.push("      info( '* Adding hosts' )\n");
    hosts.forEach((item) => {
      content.push(
        "      " +
          item.id +
          " = " +
          "net.addHost( '" +
          item.id +
          "',ip='" +
          item.data.extData.ipAddress +
          "' ,mac='" +
          item.data.extData.macAddress +
          "')" +
          "\n"
      );
    });

    content.push("      info( '* Adding switcher' )\n");
    switchs.forEach((item) => {
      content.push(
        "      " +
          item.id +
          " = " +
          "net.addSwitch( '" +
          item.id +
          "',ip='" +
          item.data.extData.ipAddress +
          "' ,mac='" +
          item.data.extData.macAddress +
          "')" +
          "\n"
      );
    });
    content.push("      info( '* Adding links' )\n");

    if (linksWithoutport.length > 0) {
      linksWithoutport.forEach((item) => {
        if (item.src[0] !== "C" && item.tar[0] !== "C") {
          content.push(
            "      " +
              "net.addLink(" +
              item.src +
              "," +
              item.tar +
              ",bw=" +
              item.bw +
              ",delay='" +
              item.delay +
              "ms')" +
              "\n"
          );
        }
      });
    }
    if (links.length > 0) {
      links.forEach((item) => {
        if (item.sourcee[0] !== "C" && item.targett[0] !== "C") {
          content.push(
            "      " +
              "net.addLink(" +
              item.sourcee +
              "," +
              item.targett +
              ",port1=" +
              item.sourcePort +
              ",port2=" +
              item.targetPort +
              ",bw=" +
              item.band +
              ",delay='" +
              item.del +
              "ms')" +
              "\n"
          );
        }
      });
    }

    content.push("      net.build()" + "\n");

    edges.forEach((item) => {
      if (item.source[0] === "C" && item.target[0] === "S") {
        content.push(
          "      " + item.target + ".start([" + item.source + "])" + "\n"
        );
      } else if (item.source[0] === "S" && item.target[0] === "C") {
        content.push(
          "      " + item.source + ".start([" + item.target + "])" + "\n"
        );
      }
    });
    content.push("      info( '* Starting network' )\n");
    content.push("      net.start()" + "\n      net.pingAll()\n");
    content.push(
      "      info( '* Stopping network') \n      net.stop()\nif __name__ == '__main__':\n      setLogLevel( 'info' )\n      fun()\n"
    );

    const file = new Blob(content, {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.py";
    document.body.appendChild(element);
    element.click();
  };
  return (
    <button className="butto" onClick={generateFile}>
      Generate Mininet File
    </button>
  );
}

export default CreateFile;
