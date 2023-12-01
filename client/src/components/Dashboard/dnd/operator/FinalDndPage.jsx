import React, { useCallback, useEffect, useRef, useState } from "react";
//import { INFRASTRUCTURE } from "../../DATA";
import ReactFlow, {
  addEdge,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useKeyPress,
  useNodesState,
} from "react-flow-renderer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../../Pages/operator/operatordashboard.css";

import "./tools/dragDropOperator.css";
import SideBar, { InfNode } from "./tools/SideBar";
import { Handle, Position } from "react-flow-renderer";
import HostForm from "./forms/HostForm";
import LinkForm from "./forms/LinkForm";
import SwitchForm from "./forms/SwitchForm";
import PortsForm from "./forms/PortsForm";
import ControllerForm from "./forms/ControllerForm";
import InfrastructureForm from "./forms/InfrastructureForm";
import Axios from "axios";
import CreateFile from "../../../create-file/createFile";
const HostNode = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <Handle type="target" position={Position.Top} />

      <img
        src="/pictures/host.png"
        width="30px"
        style={{
          marginTop: "5px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      />
      <h6 style={{ textAlign: "center", fontSize: "8px", marginBottom: "2px" }}>
        {data.label}
      </h6>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const SwitchNode = ({ data }) => (
  <div style={{ width: "70px" }}>
    <Handle type="target" position={Position.Top} />
    <img
      src="/pictures/switch.png"
      width="30px"
      style={{
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    />
    <h6 style={{ textAlign: "center", fontSize: "8px", marginBottom: "2px" }}>
      {data.label}
    </h6>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const ControllerNode = ({ data }) => (
  <div style={{ width: "70px" }}>
    <Handle type="target" position={Position.Top} />
    <img
      src="/pictures/controller.png"
      width="30px"
      style={{
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    />
    <h6 style={{ textAlign: "center", fontSize: "8px", marginBottom: "2px" }}>
      {data.label}
    </h6>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = {
  Host: HostNode,
  Switch: SwitchNode,

  Controller: ControllerNode,
};
function FinalDndPage(props) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeName, setNodeName] = useState("");
  const [EdgeName, setEdgeName] = useState("");
  const [operatorId, setOperatorId] = useState(null);
  const [nodeData, setNodeDatatest] = useState([]);
  const [EdgeData, setEdgeDatatest] = useState([]);

  const navigate = useNavigate();
  const nodesTable = useRef([]);
  const [isClickedInfraCreate, setIsClickedInfraCreate] = useState(false);

  const selectedNode = useRef(null);
  const selectedNodeData = useRef(null);

  function updateNodeData(newValue) {
    console.log(newValue);

    setNodeDatatest(newValue);
  }
  toast.configure();
  /////////5/10
  const [Inf, setInf] = useState(null);
  const [PortsValuesDataForm, setPortsValuesDataForm] = useState({});
  function updateNodeDataPort(newValue) {
    console.log(newValue);
    //////

    setNodes((nds) =>
      nds.map((node) => {
        const newPortsTable = node.data.ports.filter(
          (link) => link.linkKey != newValue.linkKey
        );
        {
          node.data = {
            ...node.data,

            ports: newPortsTable,
          };
        }

        return node;
      })
    );
    //////
    setPortsValuesDataForm(newValue);
  }
  ////////////////////////////////////////////////////////////////////

  console.warn(nodes, "aprés changement");
  ////////////////////////////////////////////////////////////////////

  /////////
  function updateEdgeData(newValue) {
    console.log(newValue);
    console.log(EdgeName);
    setEdgeDatatest(newValue);
  }

  const extData = {
    bandwith: "10",
    delay: "5",
    //l'emplacement des ports des nodes !!!!!!!!!!!!!!
  };

  /////original/////
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge({ ...params, extData }, eds)),

  //   []
  // );
  //////original///////

  function onConnect(params) {
    let verification = false;
    for (let index = 0; index < edges.length; index++) {
      if (
        edges[index].id.indexOf(params.source) !== -1 &&
        edges[index].id.indexOf(params.target) !== -1
      ) {
        verification = true;
      }
    }
    if (verification === false) {
      setEdges((eds) => addEdge({ ...params, extData }, eds));
    }
  }
  const removeNode = useCallback(
    (id) => {
      console.log({ reactFlowInstance });
      const newNodes = reactFlowInstance
        .getNodes()
        .filter((item) => item.id !== id);
      console.log({ newNodes, id });
      const removeEdge = reactFlowInstance
        .getEdges()
        .filter((edge) => edge.id.indexOf(id) === -1);
      console.log({ removeEdge, id });
      setEdges([...removeEdge]);
      setNodes([...newNodes]);

      ////

      setNodes((nds) =>
        nds.map((node) => {
          const newPortsTable = node.data.ports.filter(
            (link) => link.linkKey.indexOf(id) === -1
          );
          {
            node.data = {
              ...node.data,

              ports: newPortsTable,
            };
          }

          return node;
        })
      );
      ////
    },
    [reactFlowInstance]
  );

  console.log(edges, "edges");

  function changeHandler1() {
    setIsEdge(false);
    console.log("inf", reactFlowInstance.toObject());
  }
  function changeHandler2() {
    setIsOpen(false);

    console.log("inf", reactFlowInstance.toObject());
  }
  function changeHandler3() {
    setisOpenPortForm(false);
  }

  ////
  const getId = (type) => {
    var id = "";

    var nbrElement = nodes.filter((node) => node.type === type).length;

    console.log(nbrElement);
    if (
      nbrElement > 0 &&
      nodes.findIndex((node) => node.id === type + "_" + String(nbrElement)) ===
        -1
    ) {
      id = type + "_" + String(nbrElement);
    } else if (
      nbrElement > 0 &&
      nodes.findIndex((node) => node.id === type + "_" + String(nbrElement)) !=
        -1
    ) {
      console.log("wrong");
      nbrElement = 0;
      while (
        nodes.findIndex(
          (node) => node.id === type + "_" + String(nbrElement)
        ) != -1
      ) {
        nbrElement = nbrElement + 1;
        console.log(nbrElement);
      }
      id = type + "_" + String(nbrElement);
    } else {
      id = type + "_0";
    }
    return id;
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const newNode = useRef(null);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const id = getId(type);
      if (type.charAt(0) === "C") {
        newNode.current = {
          id,

          type,

          data: {
            label: id,
            ports: [],
            extData: {
              cpuCapacity: 5,
              romCapacity: 512,
              ramCapacity: 16,
              ipAddress: "192.168.10.15",
              macAddress: "12:15:45:69:87:95",
              portTcp: "10",
            },
          },
          position,
        };
      } else {
        newNode.current = {
          id,

          type,

          data: {
            label: id,
            ports: [],
            extData: {
              cpuCapacity: 5,
              romCapacity: 512,
              ramCapacity: 16,
              ipAddress: "192.168.10.15",
              macAddress: "12:15:45:69:87:95",
            },
          },
          position,
        };
      }

      setNodes([...nodes, newNode.current]);
      //

      //
    },
    [nodes, reactFlowInstance]
  );

  console.log(nodes, "hello");

  const style = {
    width: "100%",
    height: 700,
  };
  function find() {
    var vv = null;
    edges.map((edg) => {
      if (edg.id === EdgeName) vv = edg;
      console.log(vv);
    });
    return vv;
  }

  useEffect(() => {
    setEdges((edg) =>
      edg.map((edge) => {
        if (edge.id === EdgeName) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          edge = {
            ...edge,

            extData: {
              bandwith: EdgeData.formValues.bandwith,
              delay: EdgeData.formValues.delay,
            },
          };
          console.log(edge, "gggggg");
        }

        return edge;
      })
    );
  }, [EdgeData]);

  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let test;
    nodes.map((node) => {
      if (node.id === PortsValuesDataForm.Source) {
        node.data.ports = [
          ...node.data.ports,
          {
            num: PortsValuesDataForm.formValues.sourcePort,
            linkKey: PortsValuesDataForm.linkKey,
          },
        ];
      }
      //////

      ///////

      test = node;
    });

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === test.id) {
          node = test;
        }
        return node;
      })
    );
  }, [PortsValuesDataForm]);
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let test;
    nodes.map((node) => {
      if (node.id === PortsValuesDataForm.Target) {
        node.data.ports = [
          ...node.data.ports,
          {
            num: PortsValuesDataForm.formValues.targetPort,
            linkKey: PortsValuesDataForm.linkKey,
          },
        ];
      }

      test = node;
    });

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === test.id) {
          node = test;
        }
        return node;
      })
    );
  }, [PortsValuesDataForm]);
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.current) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          if (node.type.charAt(0) === "C") {
            node.data = {
              ...node.data,

              extData: {
                cpuCapacity: nodeData.formValues.cpuCapacity,
                romCapacity: nodeData.formValues.romCapacity,
                ramCapacity: nodeData.formValues.ramCapacity,
                ipAddress: nodeData.formValues.ipAddress,
                macAddress: nodeData.formValues.macAddress,
                portTcp: nodeData.formValues.portTcp,
              },
            };
          } else {
            node.data = {
              ...node.data,

              extData: {
                cpuCapacity: nodeData.formValues.cpuCapacity,
                romCapacity: nodeData.formValues.romCapacity,
                ramCapacity: nodeData.formValues.ramCapacity,
                ipAddress: nodeData.formValues.ipAddress,
                macAddress: nodeData.formValues.macAddress,
              },
            };
          }
          console.log(node.data.extData, "gggggg");
        }

        return node;
      })
    );
  }, [nodeData]);

  ///
  const token = localStorage.getItem("jwt");
  console.log(token);
  const [infName, setInfName] = useState(null);
  const [infrastructureId, setInfrastructureId] = useState("");
  function onUpdateData() {
    if (infName) {
      setIsClickedInfraCreate(true);
    }
  }
  /////////////////////////logique du post start  //////////////////////////////////////////////////
  const submitInf = (data) => {
    console.log(data);
    if (!infName) {
      setInfName(data);
      Axios.post(
        "http://localhost:5000/api/operator/infrastructure",
        {
          name: data,
        },
        { headers: { Authorization: token } }
      ).then((response) => {
        console.log("&&&&&&&");
        console.log(response.data._id);

        setInfrastructureId(response.data._id);
        setOperatorId(response.data.operator);
      });
    } else {
      console.log(infName, "infnaem********");
      setInfName(data);
      console.log(infrastructureId);
      console.log(data);
      console.log(operatorId);

      Axios.put(
        `http://localhost:5000/api/operator/infrastructure/${infrastructureId}`,
        {
          name: data,
          operator: operatorId,
        },
        { headers: { Authorization: token } }
      ).then((response) => {
        console.log("****************updated*********************");
        console.log(response);
        toast("Edited successfully ", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: "success",
          theme: "dark",
        });
      });
    }
  };
  ////////////////////////////////////post Infra Data start /////////////////////////////////////
  const onUpdataInfrastructure = useRef(false);
  const infrastructureDataId = useRef(null);

  useEffect(() => {
    if (Inf != null && onUpdataInfrastructure.current === false) {
      var edges = [];
      var nodes = [];

      ////////changer les id a des valeur de ..key
      for (let index = 0; index < Inf.nodes.length; index++) {
        const node = {
          nodeKey: Inf.nodes[index].id,

          type: Inf.nodes[index].type,

          data: Inf.nodes[index].data,
          position: Inf.nodes[index].position,
        };

        nodes.push(node);
      }
      for (let index = 0; index < Inf.edges.length; index++) {
        const edge = {
          linkKey: Inf.edges[index].id,
          source: Inf.edges[index].source,
          target: Inf.edges[index].target,
          extData: Inf.edges[index].extData,
        };

        edges.push(edge);
      }

      ////////
      console.log(
        "*************************InfNodes &&InfEdges&&id ***************"
      );

      console.log(nodes);
      console.log(edges);
      console.log(infrastructureId);
      const postedInfrastructure = {
        infrastructure: infrastructureId,
        nodes: nodes,
        edges: edges,
      };
      console.log(postedInfrastructure);

      Axios.post(
        "http://localhost:5000/api/operator/infrastructure/infrastructureData",
        {
          postedInfrastructure,
        }
      ).then((response) => {
        console.log("ok");
        console.log(response);
        infrastructureDataId.current = response.data._id;
        onUpdataInfrastructure.current = true;
      });
    }
  }, [Inf]);
  ////////////////////////////////////post Infra Data end /////////////////////////////////////
  ////////////////////////////////////get Infra Data start /////////////////////////////////////
  useEffect(() => {
    Axios.get("http://localhost:5000/api/operator/infrastructure/", {
      headers: { Authorization: token },
    }).then((response) => {
      console.log(response.data);
      setInfrastructureId(response.data[0]._id);
      setOperatorId(response.data[0].operator);

      setInfName(response.data[0].name);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/api/operator/infrastructure/infrastructureData/${infrastructureId}`
    ).then((response) => {
      console.log(response.data[0]._id);
      if (response.data[0]._id) {
        onUpdataInfrastructure.current = true;
        infrastructureDataId.current = response.data[0]._id;
      }

      var infrastructure = response.data[0];

      ////
      var edges = [];
      var nodes = [];

      ////////changer les id a des valeur de ..key
      for (let index = 0; index < infrastructure.nodes.length; index++) {
        const node = {
          id: infrastructure.nodes[index].nodeKey,

          type: infrastructure.nodes[index].type,

          data: infrastructure.nodes[index].data,
          position: infrastructure.nodes[index].position,
        };

        nodes.push(node);
      }
      for (let index = 0; index < infrastructure.edges.length; index++) {
        const edge = {
          id: infrastructure.edges[index].linkKey,
          source: infrastructure.edges[index].source,
          target: infrastructure.edges[index].target,
          extData: infrastructure.edges[index].extData,
        };

        edges.push(edge);
      }

      ////////
      console.log(
        "*************************infrastructureNodes &&infrastructureEdges&&id Gettted***************"
      );

      console.log(nodes);
      console.log(edges);
      console.log(infrastructureId);
      const gettedInfrastructure = {
        infrastructure: infrastructureId,
        nodes: nodes,
        edges: edges,
      };
      setNodes(gettedInfrastructure.nodes);
      setEdges(gettedInfrastructure.edges);
      console.log(gettedInfrastructure);
    });
  }, [infrastructureId]);
  ////////////////////////////////////get Infra Data end /////////////////////////////////////
  ////////////////////////////////////update Infra Data start /////////////////////////////////////
  useEffect(() => {
    if (onUpdataInfrastructure.current === true) {
      var edges = [];
      var nodes = [];

      ////////changer les id a des valeur de ..key
      for (let index = 0; index < Inf.nodes.length; index++) {
        const node = {
          nodeKey: Inf.nodes[index].id,

          type: Inf.nodes[index].type,

          data: Inf.nodes[index].data,
          position: Inf.nodes[index].position,
        };

        nodes.push(node);
      }
      for (let index = 0; index < Inf.edges.length; index++) {
        const edge = {
          linkKey: Inf.edges[index].id,
          source: Inf.edges[index].source,
          target: Inf.edges[index].target,
          extData: Inf.edges[index].extData,
        };

        edges.push(edge);
      }

      ////////
      console.log(
        "*************************infrastructureNodes &&infrastructureEdges&&id ***************"
      );

      console.log(nodes);
      console.log(edges);
      console.log(infrastructureId);
      const postedInfrastructure = {
        infrastructure: infrastructureId,
        nodes: nodes,
        edges: edges,
      };
      console.log(infrastructureDataId.current);
      var id = infrastructureDataId.current;
      console.log(postedInfrastructure);
      Axios.put(
        `http://localhost:5000/api/operator/infrastructure/infrastructureData/${infrastructureDataId.current}`,
        { postedInfrastructure }
      ).then((response) => {
        console.log("****************updated*********************");
        console.log(response);
      });
    }
  }, [Inf]);

  function changeHandlerCreateInf() {
    setIsClickedInfraCreate(false);
  }

  ///

  var forFile = useRef(null);
  function onSaveData() {
    if (!infName) {
      setIsClickedInfraCreate(true);
    } else if (reactFlowInstance && infName) {
      const flow = reactFlowInstance.toObject();
      setInf({ ...flow, idInf: infName });
      forFile.current = { ...flow, idInf: infName };

      console.log(forFile.current);
      toast("Save succeeded ", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "success",
        theme: "dark",
      });
    }
  }

  const sourcePortt = useRef(null);
  const targetPortt = useRef(null);
  ///

  const [isOpen, setIsOpen] = useState(false);
  const [isEdge, setIsEdge] = useState(false);
  const [isOpenPortForm, setisOpenPortForm] = useState(false);
  ///////5/10
  const target = useRef(null);
  const source = useRef(null);
  const portsTarget = useRef(null);
  const portsSource = useRef(null);
  const linkKey = useRef(null);
  ///
  const Ppressed = useKeyPress("p");
  useEffect(() => {
    console.log(Ppressed);
  }, [Ppressed]);

  const SupprPressed = useKeyPress("Delete");
  useEffect(() => {
    console.log(SupprPressed);
  }, [SupprPressed]);

  const portTable = useRef([]);

  return (
    <div>
      <div className="center" style={{ width: "60%" }}>
        <button className="butto" onClick={onSaveData}>
          {!infName ? "Create" : "Save"} Infrastructure
        </button>
        {!infName ? (
          <div></div>
        ) : (
          <button className="butto" onClick={onUpdateData}>
            Edit Infrastructure Name
          </button>
        )}
        {!forFile.current ? (
          <div></div>
        ) : (
          <CreateFile forF={forFile.current}></CreateFile>
        )}
      </div>
      <div className="dndflow">
        <ReactFlowProvider>
          <SideBar />

          <div ref={reactFlowWrapper} className="board">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              nodeTypes={nodeTypes}
              onDragOver={onDragOver}
              fitView
              onEdgeClick={(event, edge) => {
                if (SupprPressed) {
                  console.log(edge);

                  setNodes((nds) =>
                    nds.map((node) => {
                      const newPortsTable = node.data.ports.filter(
                        (link) => link.linkKey != edge.id
                      );
                      {
                        node.data = {
                          ...node.data,

                          ports: newPortsTable,
                        };
                      }

                      return node;
                    })
                  );
                  ////////visualisation//////
                  nodes.map((node) => {
                    console.table(node.data.ports);
                  });

                  ////////visualisation//////
                  //////////////////////
                  const removeEdge = reactFlowInstance
                    .getEdges()
                    .filter((item) => item.id !== edge.id);

                  setEdges([...removeEdge]);
                }
                ////////////5/10
                else if (Ppressed) {
                  setisOpenPortForm(true);
                  target.current = edge.target;
                  source.current = edge.source;
                  ///////
                  sourcePortt.current = null;
                  targetPortt.current = null;
                  nodes.map((node) => {
                    if (node.id === edge.source) {
                      for (
                        let index = 0;
                        index < node.data.ports.length;
                        index++
                      ) {
                        if (node.data.ports[index].linkKey === edge.id) {
                          sourcePortt.current = node.data.ports[index].num;
                          console.error(sourcePortt.current, "source");
                        }
                      }
                    } else if (node.id === edge.target) {
                      for (
                        let index = 0;
                        index < node.data.ports.length;
                        index++
                      ) {
                        if (node.data.ports[index].linkKey === edge.id) {
                          targetPortt.current = node.data.ports[index].num;
                          console.error(targetPortt.current, "target");
                        }
                      }
                    }
                  });

                  ////////
                  linkKey.current = edge.id;
                  console.log("src,target:", source.current, target.current);
                  nodes.map((node) => {
                    if (node.id === target.current) {
                      portsTarget.current = node.data.ports;
                    }
                    if (node.id === source.current) {
                      portsSource.current = node.data.ports;
                    }
                  });
                }

                ///////
              }}
              onNodeClick={(event, node) => {
                if (SupprPressed) {
                  removeNode(node.id);
                }
              }}
              onEdgeDoubleClick={(event, edge) => {
                console.error("edge", edge);

                setEdgeName(edge.id);

                setIsEdge(true);
                setIsOpen(false);

                console.error(edges);
              }}
              onNodeDoubleClick={(event, node) => {
                console.error("node", node);
                setIsEdge(false);
                setIsOpen(true);
                setNodeName(node.id);
                //setNodeSelectedId(node.id);
                selectedNode.current = node.id;
                selectedNodeData.current = node.data;
                console.log(selectedNodeData);
                //setNodeSelectedData(node.data);
              }}
            >
              <Controls />
            </ReactFlow>
          </div>
          {isEdge && (
            <LinkForm
              onConfirm={changeHandler1}
              onChange={updateEdgeData}
              EdgeSelectedData={find()}
            />
          )}
          {isOpen && nodeName.charAt(0) === "H" && (
            <HostForm
              onConfirm={changeHandler2}
              nodeName={nodeName}
              onChange={updateNodeData}
              nodeSelectedData={selectedNodeData.current}
              //

              //
            />
          )}
          {isOpen && nodeName.charAt(0) === "C" && (
            <ControllerForm
              onConfirm={changeHandler2}
              nodeName={nodeName}
              onChange={updateNodeData}
              nodeSelectedData={selectedNodeData.current}
            />
          )}
          {isOpen && nodeName.charAt(0) === "S" && (
            <SwitchForm
              onConfirm={changeHandler2}
              nodeName={nodeName}
              onChange={updateNodeData}
              nodeSelectedData={selectedNodeData.current}
            />
          )}
          {isClickedInfraCreate && (
            <InfrastructureForm
              onConfirm={changeHandlerCreateInf}
              data={submitInf}
              nameInf={infName}
            />
          )}
          {/*5/10*/}
          {isOpenPortForm && (
            <PortsForm
              source={source.current}
              target={target.current}
              portsSource={portsSource.current}
              portsTarget={portsTarget.current}
              linkKey={linkKey.current}
              onConfirm={changeHandler3}
              onChange={updateNodeDataPort}
              sourcePortt={sourcePortt.current}
              targetPortt={targetPortt.current}
            />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default FinalDndPage;
