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
import "./tools/dragDropCustomer.css";
import "react-toastify/dist/ReactToastify.css";
import "../../../../Pages/customer/customerDashboard.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NodeSfcForm from "./forms/NodeSfcForm";
import SfcForm from "./forms/SfcForm";
import "./tools/dragDropCustomer.css";
import SideBar, { InfNode } from "./tools/SideBar";
import { Handle, Position } from "react-flow-renderer";
import SfcLinkForm from "./forms/SfcLinkForm";
import Axios from "axios";

const FireWallFunction = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <Handle type="target" position={Position.Left} />

      <img
        src="/pictures/firewall.png"
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const NatFunction = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <Handle type="target" position={Position.Left} />

      <img
        src="/pictures/nat.png"
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
const IdsFunction = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <Handle type="target" position={Position.Left} />

      <img
        src="/pictures/ids.png"
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
const SourceNode = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <img
        src="/pictures/source.png"
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
const DestinationNode = ({ data }) => {
  return (
    <div style={{ width: "70px" }}>
      <Handle type="target" position={Position.Left} />

      <img
        src="/pictures/destination.png"
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
    </div>
  );
};
const nodeTypes = {
  FireWall: FireWallFunction,
  NAT: NatFunction,
  IDS: IdsFunction,
  Source: SourceNode,
  Destination: DestinationNode,
};

function FinalDndPage(props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeName, setNodeName] = useState("");
  const [EdgeName, setEdgeName] = useState("");
  const [sfc, setSfc] = useState(null);
  const reactFlowWrapper = useRef(null);

  const [nodeData, setNodeDatatest] = useState([]);
  const [EdgeData, setEdgeDatatest] = useState([]);
  // const [inf, setInf] = useState({ name: "", NODES: [] });
  const navigate = useNavigate();

  const [isClickedSfcCreate, setIsClickedSfcCreate] = useState(false);

  const selectedNode = useRef(null);
  const selectedNodeData = useRef(null);
  const [sfcDataForm, setSfcDataForm] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdge, setIsEdge] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  function changeHandler1() {
    setIsEdge(false);
    console.log("sfc", reactFlowInstance.toObject());
  }
  function changeHandler2() {
    setIsOpen(false);

    console.log("sfc", reactFlowInstance.toObject());
  }

  function changeHandlerCreateSfc() {
    setIsClickedSfcCreate(false);
  }

  ///////////////test//////////////////////////
  function onUpdateData() {
    if (sfcDataForm) {
      setIsClickedSfcCreate(true);
    }
  }
  toast.configure();

  /////////////////////////////////
  //////////////////////////////////////////////sfc data posting start///////////////////////////////////

  const [sfcId, setSfcId] = useState("");
  const token = localStorage.getItem("jwt");
  console.log("token");
  console.log(token);
  const submitSfc = (data) => {
    console.log(token);
    console.log(data);
    if (!sfcDataForm) {
      setSfcDataForm(data.formValues);
      const nbSources = data.formValues.nbSources;
      const nbDestinations = data.formValues.nbDestinations;
      const debit = data.formValues.debit;
      const delay = data.formValues.delay;

      Axios.post(
        "http://localhost:5000/api/customer/sfc/",
        {
          nbSources,
          nbDestinations,
          debit,
          delay,
        },
        { headers: { Authorization: token } }
      ).then((response) => {
        console.log("&&&&&&&");

        setSfcId(response.data._id);
        setCustomerId(response.data.customer);
      });
    } else {
      setSfcDataForm(data.formValues);
      const nbSources = data.formValues.nbSources;
      const nbDestinations = data.formValues.nbDestinations;
      const debit = data.formValues.debit;
      const delay = data.formValues.delay;
      console.log("************sfcId***********");
      console.log(sfcId);
      console.log("*************customer*********************");
      console.log(customerId);
      Axios.put(
        `http://localhost:5000/api/customer/sfc/${sfcId}`,
        {
          nbSources,
          nbDestinations,
          debit,
          delay,
          customer: customerId,
        },
        { headers: { Authorization: token } }
      ).then((response) => {
        console.log("****************updated*********************");
        console.log(response);
      });
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
    }
  };

  ///////////////////////////////////////////post sfcDaata start ///////////////////////////////
  const onUpdataSfc = useRef(false);
  const sfcDataId = useRef(null);
  useEffect(() => {
    if (sfc != null && onUpdataSfc.current === false) {
      var edges = [];
      var nodes = [];

      ////////changer les id a des valeur de ..key
      for (let index = 0; index < sfc.nodes.length; index++) {
        const node = {
          nodeKey: sfc.nodes[index].id,

          type: sfc.nodes[index].type,

          data: sfc.nodes[index].data,
          position: sfc.nodes[index].position,
        };

        nodes.push(node);
      }
      for (let index = 0; index < sfc.edges.length; index++) {
        const edge = {
          linkKey: sfc.edges[index].id,
          source: sfc.edges[index].source,
          target: sfc.edges[index].target,
          extData: sfc.edges[index].extData,
        };

        edges.push(edge);
      }

      ////////
      console.log(
        "*************************sfcNodes &&sfcEdges&&id ***************"
      );

      console.log(nodes);
      console.log(edges);
      console.log(sfcId);
      const postedSfc = { sfc: sfcId, nodes: nodes, edges: edges };
      console.log(postedSfc);

      Axios.post("http://localhost:5000/api/customer/sfc/sfcData", {
        postedSfc,
      }).then((response) => {
        console.log("ok");
        console.log(response);
        sfcDataId.current = response.data._id;
        onUpdataSfc.current = true;
      });
    }
  }, [sfc]);

  ///////////////////////////////////////////post sfcDaata end  ///////////////////////////////

  ////////////////////////////get sfcDataa start ////////////////////////////////////////////

  useEffect(() => {
    Axios.get("http://localhost:5000/api/customer/sfc/", {
      headers: { Authorization: token },
    }).then((response) => {
      console.log(response.data);
      setSfcId(response.data[0]._id);
      setCustomerId(response.data[0].customer);

      setSfcDataForm(response.data[0]);
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/customer/sfc/sfcData/${sfcId}`).then(
      (response) => {
        console.log(response.data[0]._id);
        if (response.data[0]._id) {
          onUpdataSfc.current = true;
          sfcDataId.current = response.data[0]._id;
        }

        var sfc = response.data[0];

        ////
        var edges = [];
        var nodes = [];

        ////////changer les id a des valeur de ..key
        for (let index = 0; index < sfc.nodes.length; index++) {
          const node = {
            id: sfc.nodes[index].nodeKey,

            type: sfc.nodes[index].type,

            data: sfc.nodes[index].data,
            position: sfc.nodes[index].position,
          };

          nodes.push(node);
        }
        for (let index = 0; index < sfc.edges.length; index++) {
          const edge = {
            id: sfc.edges[index].linkKey,
            source: sfc.edges[index].source,
            target: sfc.edges[index].target,
            extData: sfc.edges[index].extData,
          };

          edges.push(edge);
        }

        ////////
        console.log(
          "*************************sfcNodes &&sfcEdges&&id Gettted***************"
        );

        console.log(nodes);
        console.log(edges);
        console.log(sfcId);
        const gettedSfc = { sfc: sfcId, nodes: nodes, edges: edges };
        setNodes(gettedSfc.nodes);
        setEdges(gettedSfc.edges);
        console.log(gettedSfc);
      }
    );
  }, [sfcId]);
  /////////////////////////end getted sfcData///////////////////////////////
  //////////////////////updating sfcDataa begin///////////////////////////

  useEffect(() => {
    if (onUpdataSfc.current === true) {
      var edges = [];
      var nodes = [];

      ////////changer les id a des valeur de ..key
      for (let index = 0; index < sfc.nodes.length; index++) {
        const node = {
          nodeKey: sfc.nodes[index].id,

          type: sfc.nodes[index].type,

          data: sfc.nodes[index].data,
          position: sfc.nodes[index].position,
        };

        nodes.push(node);
      }
      for (let index = 0; index < sfc.edges.length; index++) {
        const edge = {
          linkKey: sfc.edges[index].id,
          source: sfc.edges[index].source,
          target: sfc.edges[index].target,
          extData: sfc.edges[index].extData,
        };

        edges.push(edge);
      }

      ////////
      console.log(
        "*************************sfcNodes &&sfcEdges&&id ***************"
      );

      console.log(nodes);
      console.log(edges);
      console.log(sfcId);
      const postedSfc = {
        sfc: sfcId,
        nodes: nodes,
        edges: edges,
      };
      console.log(sfcDataId.current);
      var id = sfcDataId.current;
      console.log(postedSfc);
      Axios.put(
        `http://localhost:5000/api/customer/sfc/sfcData/${sfcDataId.current}`,
        { postedSfc }
      ).then((response) => {
        console.log("****************updated*********************");
        console.log(response);
      });
    }
  }, [sfc]);

  function updateEdgeData(newValue) {
    console.log(newValue);
    console.log(EdgeName);
    setEdgeDatatest(newValue);
  }
  function find() {
    var vv = null;
    edges.map((edg) => {
      if (edg.id === EdgeName) vv = edg;
      console.log(vv);
    });
    return vv;
  }

  // a changé selon les données des liens
  const extData = {
    debit: "10",
    propagationDelay: "5",
  };

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

  ///////

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
    },
    [reactFlowInstance]
  );

  function updateNodeData(newValue) {
    console.log(newValue);

    setNodeDatatest(newValue);
  }

  function onSaveData() {
    if (!sfcDataForm) {
      setIsClickedSfcCreate(true);
    } else if (reactFlowInstance && sfcDataForm) {
      const flow = reactFlowInstance.toObject();
      setSfc({ ...flow, SfcData: sfcDataForm.formValues });
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
  props.onSaveSfc(sfc);

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
      if (
        type.charAt(0) === "N" ||
        type.charAt(0) === "I" ||
        type.charAt(0) === "F"
      ) {
        newNode.current = {
          id,

          type,

          data: {
            label: id,

            extData: {
              expectedProcessingTime: "10",
              packetPerSecond: "2",
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
  useEffect(() => {
    setEdges((edg) =>
      edg.map((edge) => {
        if (edge.id === EdgeName) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          edge = {
            ...edge,

            extData: {
              debit: EdgeData.formValues.debit,
              propagationDelay: EdgeData.formValues.propagationDelay,
            },
          };
          console.log(edge, "gggggg");
        }

        return edge;
      })
    );
  }, [EdgeData]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.current) {
          // it's important that you create a new object here
          // in order to notify react flow about the change

          node.data = {
            ...node.data,

            extData: {
              expectedProcessingTime:
                nodeData.formValues.expectedProcessingTime,
              packetPerSecond: nodeData.formValues.packetPerSecond,
            },
          };

          console.log(node.data.extData, "gggggg");
        }

        return node;
      })
    );
  }, [nodeData]);

  const SupprPressed = useKeyPress("Delete");
  useEffect(() => {
    console.log(SupprPressed);
  }, [SupprPressed]);

  return (
    <div>
      <div className="centerr">
        <button className="buttoo" onClick={onSaveData}>
          {!sfcDataForm ? "Create" : "Save"} Service Function Chain
        </button>
        {!sfcDataForm ? (
          <div></div>
        ) : (
          <button className="buttoo" onClick={onUpdateData}>
            Edit Service Function Chain
          </button>
        )}
      </div>
      <div className="dndfloww">
        <ReactFlowProvider>
          <SideBar />

          <div ref={reactFlowWrapper} className="boardd">
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
                  const removeEdge = reactFlowInstance
                    .getEdges()
                    .filter((item) => item.id !== edge.id);

                  setEdges([...removeEdge]);
                }
              }}
              onEdgeDoubleClick={(event, edge) => {
                console.error("edge", edge);

                setEdgeName(edge.id);

                setIsEdge(true);
                setIsOpen(false);

                console.error(edges);
              }}
              onNodeClick={(event, node) => {
                if (SupprPressed) {
                  removeNode(node.id);
                }
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
            <SfcLinkForm
              onConfirm={changeHandler1}
              onChange={updateEdgeData}
              EdgeSelectedData={find()}
            />
          )}
          {isOpen &&
            (nodeName.charAt(0) === "N" ||
              nodeName.charAt(0) === "I" ||
              nodeName.charAt(0) === "F") && (
              <NodeSfcForm
                onConfirm={changeHandler2}
                nodeName={nodeName}
                onChange={updateNodeData}
                nodeSelectedData={selectedNodeData.current}
                //

                //
              />
            )}

          {isClickedSfcCreate && (
            <SfcForm
              onConfirm={changeHandlerCreateSfc}
              data={submitSfc}
              sfcFormData={sfcDataForm}
            />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default FinalDndPage;
